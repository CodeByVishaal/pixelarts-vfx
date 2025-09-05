const multer = require('multer');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Allowed image types
  const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  // Allowed video types
  const videoTypes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo'];
  
  const allowedTypes = [...imageTypes, ...videoTypes];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images and videos are allowed.'), false);
  }
};

// Multer configuration for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB default
  },
  fileFilter: fileFilter
});

// Upload to Cloudinary function
const uploadToCloudinary = (fileBuffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: 'pixel-arts-vfx',
      resource_type: 'auto', // Automatically detect file type
      quality: 'auto',
      format: 'auto',
      ...options
    };

    cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    ).end(fileBuffer);
  });
};

// Middleware to handle single file upload
const handleFileUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(); // No file uploaded, continue
    }

    console.log('📤 Uploading file to Cloudinary...');
    
    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer, {
      folder: 'pixel-arts-vfx/media'
    });

    // Add upload result to request object
    req.uploadResult = {
      url: result.secure_url,
      publicId: result.public_id,
      fileSize: result.bytes,
      width: result.width,
      height: result.height,
      duration: result.duration, // For videos
      format: result.format,
      resourceType: result.resource_type
    };

    console.log('✅ File uploaded successfully:', result.public_id);
    next();
  } catch (error) {
    console.error('❌ Cloudinary upload error:', error);
    
    let errorMessage = 'File upload failed';
    
    if (error.message.includes('File size too large')) {
      errorMessage = 'File size is too large. Maximum size is 10MB.';
    } else if (error.message.includes('Invalid image file')) {
      errorMessage = 'Invalid file format. Please upload a valid image or video.';
    }
    
    return res.status(400).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Delete from Cloudinary function
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log('🗑️ File deleted from Cloudinary:', publicId);
    return result;
  } catch (error) {
    console.error('❌ Error deleting file from Cloudinary:', error);
    throw error;
  }
};

// Generate thumbnail for videos
const generateVideoThumbnail = async (publicId) => {
  try {
    const thumbnailUrl = cloudinary.url(publicId, {
      resource_type: 'video',
      format: 'jpg',
      transformation: [
        { width: 400, height: 300, crop: 'fill' },
        { quality: 'auto' }
      ]
    });
    
    return thumbnailUrl;
  } catch (error) {
    console.error('❌ Error generating video thumbnail:', error);
    return null;
  }
};

module.exports = {
  upload,
  handleFileUpload,
  uploadToCloudinary,
  deleteFromCloudinary,
  generateVideoThumbnail
};