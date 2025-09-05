const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Media = require('../models/Media');
const { verifyToken, requireAdmin, optionalAuth } = require('../middleware/auth');
const { upload, handleFileUpload, deleteFromCloudinary, generateVideoThumbnail } = require('../middleware/upload');

const router = express.Router();

// @route   GET /api/media
// @desc    Get all media (public and admin)
// @access  Public (with optional auth for admin features)
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('type').optional().isIn(['image', 'video']).withMessage('Type must be image or video'),
  query('category').optional().isIn(['showreel', 'portfolio', 'demo', 'tutorial', 'behind-scenes']),
  query('search').optional().isLength({ max: 100 }).withMessage('Search term too long')
], optionalAuth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      page = 1,
      limit = 20,
      type,
      category,
      search,
      featured,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = { isActive: true };
    
    if (type) query.type = type;
    if (category) query.category = category;
    if (featured !== undefined) query.isFeatured = featured === 'true';
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    // If sorting by sortOrder field, add createdAt as secondary sort
    if (sortBy === 'sortOrder') {
      sortOptions.createdAt = -1;
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    
    const [media, total] = await Promise.all([
      Media.find(query)
        .populate('uploadedBy', 'username')
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Media.countDocuments(query)
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.json({
      success: true,
      data: {
        media,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: total,
          itemsPerPage: parseInt(limit),
          hasNextPage,
          hasPrevPage
        }
      }
    });

  } catch (error) {
    console.error('Get media error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/media/:id
// @desc    Get single media item
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const media = await Media.findById(req.params.id)
      .populate('uploadedBy', 'username');

    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media not found'
      });
    }

    // Increment view count
    await media.incrementViews();

    res.json({
      success: true,
      data: { media }
    });

  } catch (error) {
    console.error('Get media by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   POST /api/media
// @desc    Create new media
// @access  Private (Admin only)
router.post('/', [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 100 }),
  body('description').optional().trim().isLength({ max: 500 }),
  body('type').isIn(['image', 'video']).withMessage('Type must be image or video'),
  body('category').optional().isIn(['showreel', 'portfolio', 'demo', 'tutorial', 'behind-scenes']),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('url').optional().isURL().withMessage('Invalid URL format')
], verifyToken, requireAdmin, upload.single('file'), handleFileUpload, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { title, description, type, category = 'showreel', tags = [], url } = req.body;

    // Use uploaded file URL or provided URL
    let mediaUrl = url;
    let mediaData = {};

    if (req.uploadResult) {
      // File was uploaded
      mediaUrl = req.uploadResult.url;
      mediaData = {
        cloudinaryPublicId: req.uploadResult.publicId,
        fileSize: req.uploadResult.fileSize,
        dimensions: {
          width: req.uploadResult.width,
          height: req.uploadResult.height
        },
        duration: req.uploadResult.duration,
        mimeType: `${req.uploadResult.resourceType}/${req.uploadResult.format}`,
        metadata: {
          originalName: req.file?.originalname,
          uploadSource: 'file-upload'
        }
      };

      // Generate thumbnail for videos
      if (type === 'video' && req.uploadResult.publicId) {
        mediaData.thumbnailUrl = await generateVideoThumbnail(req.uploadResult.publicId);
      }
    } else if (!url) {
      return res.status(400).json({
        success: false,
        message: 'Either file upload or URL is required'
      });
    } else {
      mediaData.metadata = { uploadSource: 'url' };
    }

    // Create new media
    const newMedia = new Media({
      title,
      description,
      type,
      url: mediaUrl,
      category,
      tags: Array.isArray(tags) ? tags : [],
      uploadedBy: req.admin._id,
      ...mediaData
    });

    await newMedia.save();

    // Populate uploadedBy field for response
    await newMedia.populate('uploadedBy', 'username');

    res.status(201).json({
      success: true,
      message: 'Media created successfully',
      data: { media: newMedia }
    });

  } catch (error) {
    console.error('Create media error:', error);
    
    // If file was uploaded but media creation failed, clean up
    if (req.uploadResult?.publicId) {
      try {
        await deleteFromCloudinary(req.uploadResult.publicId);
      } catch (cleanupError) {
        console.error('Error cleaning up uploaded file:', cleanupError);
      }
    }
    
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   PUT /api/media/:id
// @desc    Update media
// @access  Private (Admin only)
router.put('/:id', [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty').isLength({ max: 100 }),
  body('description').optional().trim().isLength({ max: 500 }),
  body('category').optional().isIn(['showreel', 'portfolio', 'demo', 'tutorial', 'behind-scenes']),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('isFeatured').optional().isBoolean(),
  body('sortOrder').optional().isInt({ min: 0 })
], verifyToken, requireAdmin, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const mediaId = req.params.id;
    const updateData = { ...req.body, updatedAt: Date.now() };

    // Find and update media
    const media = await Media.findByIdAndUpdate(
      mediaId,
      updateData,
      { new: true, runValidators: true }
    ).populate('uploadedBy', 'username');

    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media not found'
      });
    }

    res.json({
      success: true,
      message: 'Media updated successfully',
      data: { media }
    });

  } catch (error) {
    console.error('Update media error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   DELETE /api/media/:id
// @desc    Delete media
// @access  Private (Admin only)
router.delete('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media not found'
      });
    }

    // Delete file from Cloudinary if it exists
    if (media.cloudinaryPublicId) {
      try {
        await deleteFromCloudinary(media.cloudinaryPublicId);
        console.log('File deleted from Cloudinary:', media.cloudinaryPublicId);
      } catch (error) {
        console.error('Error deleting file from Cloudinary:', error);
        // Continue with deletion even if Cloudinary cleanup fails
      }
    }

    // Delete media from database
    await Media.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Media deleted successfully'
    });

  } catch (error) {
    console.error('Delete media error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   POST /api/media/:id/click
// @desc    Track media click
// @access  Public
router.post('/:id/click', async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media not found'
      });
    }

    // Increment click count
    await media.incrementClicks();

    res.json({
      success: true,
      message: 'Click tracked'
    });

  } catch (error) {
    console.error('Track click error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/media/stats/overview
// @desc    Get media statistics
// @access  Private (Admin only)
router.get('/stats/overview', verifyToken, requireAdmin, async (req, res) => {
  try {
    const stats = await Media.getStats();
    
    res.json({
      success: true,
      data: { stats: stats[0] || {} }
    });

  } catch (error) {
    console.error('Get media stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;