import React, { useState } from 'react';
import { Cloudinary } from 'cloudinary-core';

const ImageUpload = () => {
  const [images, setImages] = useState([]);

  const openWidget = () => {
    const cloudinary = new Cloudinary({ cloud_name: 'YOUR_CLOUD_NAME', secure: true });

    window.cloudinary.openUploadWidget(
      {
        cloudName: 'YOUR_CLOUD_NAME',
        uploadPreset: 'YOUR_UPLOAD_PRESET',
        cropping: true, // Enables cropping in the widget
        multiple: true, // Allows multiple file uploads
        croppingAspectRatio: 1, // Example aspect ratio for cropping
        resourceType: 'image',
        folder: 'YOUR_FOLDER_NAME', // Optional: Upload to a specific folder
      },
      (error, result) => {
        if (result.event === 'success') {
          setImages((prevImages) => [...prevImages, result.info.secure_url]);
        }
      }
    );
  };

  return (
    <div>
      <button onClick={openWidget}>Upload Images</button>
      <div className="image-gallery">
        {images.map((url, index) => (
          <img key={index} src={url} alt={`Uploaded ${index}`} className="uploaded-image" />
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
