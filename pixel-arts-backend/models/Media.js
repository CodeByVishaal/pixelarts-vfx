const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title must be less than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description must be less than 500 characters']
  },
  type: {
    type: String,
    required: [true, 'Media type is required'],
    enum: {
      values: ['image', 'video'],
      message: 'Type must be either image or video'
    }
  },
  url: {
    type: String,
    required: [true, 'Media URL is required'],
    trim: true
  },
  thumbnailUrl: {
    type: String,
    trim: true
  },
  cloudinaryPublicId: {
    type: String,
    trim: true
  },
  fileSize: {
    type: Number,
    min: 0
  },
  dimensions: {
    width: Number,
    height: Number
  },
  duration: {
    type: Number, // in seconds for videos
    min: 0
  },
  mimeType: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  category: {
    type: String,
    enum: ['showreel', 'portfolio', 'demo', 'tutorial', 'behind-scenes'],
    default: 'showreel'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  viewCount: {
    type: Number,
    default: 0
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  metadata: {
    originalName: String,
    uploadSource: {
      type: String,
      enum: ['file-upload', 'url', 'api'],
      default: 'file-upload'
    },
    quality: {
      type: String,
      enum: ['low', 'medium', 'high', 'ultra'],
      default: 'medium'
    }
  },
  seo: {
    altText: String,
    keywords: [String]
  },
  analytics: {
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    shares: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Indexes for performance
mediaSchema.index({ type: 1, isActive: 1 });
mediaSchema.index({ category: 1, isActive: 1 });
mediaSchema.index({ isFeatured: 1, sortOrder: 1 });
mediaSchema.index({ uploadedBy: 1 });
mediaSchema.index({ tags: 1 });
mediaSchema.index({ createdAt: -1 });

// Virtual for formatted file size
mediaSchema.virtual('formattedFileSize').get(function() {
  if (!this.fileSize) return 'Unknown';
  
  const bytes = this.fileSize;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  
  if (bytes === 0) return '0 Bytes';
  
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
});

// Virtual for formatted duration
mediaSchema.virtual('formattedDuration').get(function() {
  if (!this.duration || this.type !== 'video') return null;
  
  const minutes = Math.floor(this.duration / 60);
  const seconds = Math.floor(this.duration % 60);
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

// Static method to get media statistics
mediaSchema.statics.getStats = function() {
  return this.aggregate([
    {
      $facet: {
        totalStats: [
          {
            $group: {
              _id: null,
              totalMedia: { $sum: 1 },
              activeMedia: { $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] } },
              featuredMedia: { $sum: { $cond: [{ $eq: ['$isFeatured', true] }, 1, 0] } },
              totalViews: { $sum: '$viewCount' },
              totalFileSize: { $sum: '$fileSize' }
            }
          }
        ],
        typeStats: [
          {
            $match: { isActive: true }
          },
          {
            $group: {
              _id: '$type',
              count: { $sum: 1 },
              avgFileSize: { $avg: '$fileSize' }
            }
          }
        ],
        categoryStats: [
          {
            $match: { isActive: true }
          },
          {
            $group: {
              _id: '$category',
              count: { $sum: 1 }
            }
          }
        ],
        recentUploads: [
          {
            $match: { 
              isActive: true,
              createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
            }
          },
          {
            $count: 'count'
          }
        ]
      }
    }
  ]);
};

// Method to increment view count
mediaSchema.methods.incrementViews = function() {
  return this.updateOne({ $inc: { viewCount: 1, 'analytics.impressions': 1 } });
};

// Method to increment clicks
mediaSchema.methods.incrementClicks = function() {
  return this.updateOne({ $inc: { 'analytics.clicks': 1 } });
};

// Static method to search media
mediaSchema.statics.searchMedia = function(query, options = {}) {
  const {
    type = null,
    category = null,
    tags = [],
    isActive = true,
    isFeatured = null,
    limit = 20,
    skip = 0,
    sortBy = 'createdAt',
    sortOrder = -1
  } = options;

  const searchQuery = { isActive };
  
  if (query) {
    searchQuery.$or = [
      { title: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
      { tags: { $in: [new RegExp(query, 'i')] } }
    ];
  }
  
  if (type) searchQuery.type = type;
  if (category) searchQuery.category = category;
  if (tags.length > 0) searchQuery.tags = { $in: tags };
  if (isFeatured !== null) searchQuery.isFeatured = isFeatured;
  
  const sortOptions = {};
  sortOptions[sortBy] = sortOrder;
  
  return this.find(searchQuery)
    .populate('uploadedBy', 'username email')
    .sort(sortOptions)
    .limit(limit)
    .skip(skip);
};

// Pre-save middleware
mediaSchema.pre('save', function(next) {
  // Auto-generate alt text if not provided
  if (this.type === 'image' && !this.seo.altText) {
    this.seo.altText = this.title;
  }
  
  // Extract keywords from title and description for SEO
  if (!this.seo.keywords || this.seo.keywords.length === 0) {
    const text = `${this.title} ${this.description || ''}`.toLowerCase();
    const words = text.match(/\b\w{3,}\b/g) || [];
    this.seo.keywords = [...new Set(words)].slice(0, 10); // Unique words, max 10
  }
  
  next();
});

// Post-save middleware for logging
mediaSchema.post('save', function(doc) {
  console.log(`📁 Media saved: ${doc.title} (${doc.type})`);
});

// Pre-remove middleware for cleanup
mediaSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
  console.log(`🗑️ Removing media: ${this.title}`);
  
  // Here you could add logic to delete files from cloud storage
  // if (this.cloudinaryPublicId) {
  //   await cloudinary.uploader.destroy(this.cloudinaryPublicId);
  // }
  
  next();
});

module.exports = mongoose.model('Media', mediaSchema);