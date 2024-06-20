import { Constants } from "@/constants/config";
import { updateImageToCloudinary } from "@/api/profile";

export const uploadToCloudinaryAndGetLink = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", Constants.CLOUDINARY_UPLOAD_PRESET);

    try {
      const imageUrl = await updateImageToCloudinary(formData);
      return imageUrl.secure_url;
    } catch (err) {
      console.error("Upload error:", err);
      throw err; 
    }
  };