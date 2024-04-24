import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dko2qqtae',
  api_key: '965141632148366',
  api_secret: 'GVLU5rnZ5OZQTg5gBoePsNrStWY',
  secure: true
});

export async function uploadImage(filePath) {
  // Aquí, utilizamos return para asegurarnos de que el valor resuelto por upload() se devuelva a quien llame a uploadImage
  return await cloudinary.uploader.upload(filePath, {
    folder: 'replit'
  });
}

export async function deleteImage(publicId) {
  return await cloudinary.uploader.destroy(publicId);
}

cloudinary.js