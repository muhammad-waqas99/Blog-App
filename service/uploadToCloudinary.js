const cloudinary = require("./cloudinary");

const uploadToCloudinary = async (file) => {
  const result = await cloudinary.uploader.upload(
    `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
    {
      folder: "blog-app-uploads",
    }
  );

  return result.secure_url;
};

module.exports = uploadToCloudinary;