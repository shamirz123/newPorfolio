import { v2 as cloudinary } from "cloudinary";

let configured = false;

export function isCloudinaryEnabled() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

function ensureConfigured() {
  if (configured) return;
  if (!isCloudinaryEnabled()) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
    );
  }
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  configured = true;
}

export function uploadBufferToCloudinary(buffer, folder = "portfolio/projects") {
  ensureConfigured();
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
}

export async function deleteCloudinaryImage(imageUrl) {
  if (!imageUrl || !isCloudinaryEnabled()) return;
  if (!imageUrl.includes("res.cloudinary.com")) return;

  try {
    ensureConfigured();
    // URL shape: .../upload/v123/folder/name.ext
    const parts = imageUrl.split("/upload/");
    if (parts.length < 2) return;
    const afterUpload = parts[1].replace(/^v\d+\//, "");
    const publicId = afterUpload.replace(/\.[^/.]+$/, "");
    if (!publicId) return;
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete failed:", error.message);
  }
}
