const cloudinary = require('cloudinary').v2;
import streamifier from 'streamifier';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET as string
});

// Upload file buffer to Cloudinary
const cloudUpload = async function (fileBuffer: any) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error: any, result: { secure_url: any; url: any; }) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.secure_url || result.url);
      }
    });

    // Create a readable stream from the file buffer
    const bufferStream = streamifier.createReadStream(fileBuffer);

    // Pipe the buffer stream to the upload stream
    bufferStream.pipe(uploadStream);
  });
};



  

export default cloudUpload;