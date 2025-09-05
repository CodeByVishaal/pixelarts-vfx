const dotenv = require("dotenv");
dotenv.config();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// test upload
cloudinary.uploader.upload("ayali.png", (error, result) => {
  if (error) {
    console.error("❌ Upload failed:", error);
  } else {
    console.log("✅ Upload success:", result.secure_url);
  }
});
