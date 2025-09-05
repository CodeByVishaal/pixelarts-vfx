const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Media = require("../models/Media");
const { verifyToken, requireAdmin } = require("../middleware/auth");

// Configure multer (in-memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Cloudinary config (make sure these are set in .env)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @desc    Create a new media item
// @route   POST /api/media
// @access  Private (admin)
router.post("/", verifyToken, requireAdmin, upload.single("file"), async (req, res) => {
  try {
    let fileUrl = req.body.url || null;

    // ✅ If a file is uploaded, push it to Cloudinary
    if (req.file) {
      try {
        // Convert buffer to Cloudinary upload
        const streamifier = require("streamifier");
        const uploadPromise = new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "pixelarts-media",
            },
            (error, result) => {
              if (error) {
                console.error("Cloudinary Upload Error:", error);
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

        const uploadResult = await uploadPromise;

        // Save media record with Cloudinary URL
        const media = new Media({
          title: req.body.title,
          description: req.body.description,
          type: req.file.mimetype.startsWith("video/") ? "video" : "image",
          url: uploadResult.secure_url,
          tags: req.body.tags || [],
          category: req.body.category || "showreel", // Default to showreel
          isActive: true,
          isFeatured: false,
          sortOrder: 0,
          viewCount: 0,
          uploadedBy: req.admin._id, // Set by auth middleware
          cloudinaryPublicId: uploadResult.public_id,
          metadata: { 
            uploadSource: "file-upload", // Changed to valid enum value
            originalName: req.file.originalname,
            quality: "high"
          },
          seo: { 
            keywords: req.body.keywords || [],
            altText: req.body.title // Use title as alt text
          },
          fileSize: req.file.size,
          mimeType: req.file.mimetype
        });

        await media.save();

        return res.status(201).json({
          success: true,
          message: "Media created successfully",
          data: { media },
        });
      } catch (uploadError) {
        console.error("Cloudinary Upload Error:", uploadError);
        return res.status(500).json({ 
          success: false, 
          message: "Upload to Cloudinary failed",
          error: uploadError.message
        });
      }
    } else {
      // ✅ Fallback: no file, maybe just an external URL
      const media = new Media({
        title: req.body.title,
        description: req.body.description,
        type: req.body.type || "image",
        url: fileUrl,
        tags: req.body.tags || [],
        category: req.body.category || "showreel", // Default to showreel
        isActive: true,
        isFeatured: false,
        sortOrder: 0,
        viewCount: 0,
        uploadedBy: req.admin._id, // Set by auth middleware
        metadata: { 
          uploadSource: "url", // Changed to valid enum value
          quality: "medium"
        },
        seo: { 
          keywords: req.body.keywords || [],
          altText: req.body.title // Use title as alt text
        }
      });

      await media.save();

      return res.status(201).json({
        success: true,
        message: "Media created successfully (URL only)",
        data: { media },
      });
    }
  } catch (error) {
    console.error("Error creating media:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

// @desc    Get all media items
// @route   GET /api/media
// @access  Private (admin)
router.get("/", verifyToken, requireAdmin, async (req, res) => {
  try {
    const media = await Media.find()
      .sort({ createdAt: -1 }) // Most recent first
      .populate('uploadedBy', 'username email'); // Get admin details if needed

    res.status(200).json({
      success: true,
      data: media,
      message: "Media items retrieved successfully"
    });
  } catch (error) {
    console.error("Error fetching media:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch media items",
      error: error.message
    });
  }
});

// @desc    Update a media item
// @route   PUT /api/media/:id
// @access  Private (admin)
router.put("/:id", verifyToken, requireAdmin, upload.single("file"), async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    
    if (!media) {
      return res.status(404).json({
        success: false,
        message: "Media not found"
      });
    }

    // If a new file is uploaded, update Cloudinary
    if (req.file) {
      try {
        // Delete old file from Cloudinary if it exists
        if (media.cloudinaryPublicId) {
          await cloudinary.uploader.destroy(media.cloudinaryPublicId);
        }

        // Upload new file
        const streamifier = require("streamifier");
        const uploadPromise = new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "pixelarts-media",
            },
            (error, result) => {
              if (error) {
                console.error("Cloudinary Upload Error:", error);
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

        const uploadResult = await uploadPromise;

        // Update media with new file info
        media.url = uploadResult.secure_url;
        media.cloudinaryPublicId = uploadResult.public_id;
        media.type = req.file.mimetype.startsWith("video/") ? "video" : "image";
        media.fileSize = req.file.size;
        media.mimeType = req.file.mimetype;
      } catch (uploadError) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload new file",
          error: uploadError.message
        });
      }
    }

    // Update other fields
    if (req.body.title) media.title = req.body.title;
    if (req.body.description) media.description = req.body.description;
    if (req.body.category) media.category = req.body.category;
    if (req.body.tags) media.tags = req.body.tags;
    if (req.body.isActive !== undefined) media.isActive = req.body.isActive;
    if (req.body.isFeatured !== undefined) media.isFeatured = req.body.isFeatured;

    // Update metadata and SEO
    if (req.body.metadata) {
      media.metadata = {
        ...media.metadata,
        ...req.body.metadata,
        uploadSource: req.file ? "file-upload" : media.metadata.uploadSource
      };
    }

    if (req.body.seo) {
      media.seo = {
        ...media.seo,
        ...req.body.seo
      };
    }

    // Save updates
    await media.save();

    res.status(200).json({
      success: true,
      message: "Media updated successfully",
      data: { media }
    });
  } catch (error) {
    console.error("Error updating media:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update media",
      error: error.message
    });
  }
});

// @desc    Delete a media item
// @route   DELETE /api/media/:id
// @access  Private (admin)
router.delete("/:id", verifyToken, requireAdmin, async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    
    if (!media) {
      return res.status(404).json({
        success: false,
        message: "Media not found"
      });
    }

    // Delete from Cloudinary if it was uploaded there
    if (media.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(media.cloudinaryPublicId);
      } catch (cloudinaryError) {
        console.error("Cloudinary deletion error:", cloudinaryError);
        // Continue with DB deletion even if Cloudinary fails
      }
    }

    // Delete from database
    await media.deleteOne();

    res.status(200).json({
      success: true,
      message: "Media deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting media:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete media",
      error: error.message
    });
  }
});

module.exports = router;
