const Media = require("../models/Media");
const cloudinary = require("../config/cloudinary");

exports.createMedia = async (req, res) => {
  try {
    let uploadedUrl = null;
    let publicId = null;

    // If file exists -> upload to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "pixelarts", // optional folder in Cloudinary
        resource_type: "auto", // auto-detect image or video
      });
      uploadedUrl = result.secure_url;
      publicId = result.public_id;
    }

    // If frontend passed a URL directly
    if (req.body.url && !uploadedUrl) {
      uploadedUrl = req.body.url;
    }

    const media = new Media({
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      category: req.body.category,
      tags: req.body.tags,
      url: uploadedUrl,
      cloudinaryPublicId: publicId,
      uploadedBy: req.adminId, // assuming you store admin user
    });

    await media.save();

    res.status(201).json({
      success: true,
      message: "Media created successfully",
      data: { media },
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
};
