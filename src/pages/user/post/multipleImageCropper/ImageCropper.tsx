import { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import "react-easy-crop/react-easy-crop.css"; // Import styles for react-easy-crop
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


interface ImageCropperProps {
  image: File | null;
  setCroppedImage: (croppedImageFile: File | null, index: number) => void;
  index: number;
}

function ImageCropper({ image, setCroppedImage, index }: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropComplete = useCallback((croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveChanges = useCallback(() => {
    if (!croppedAreaPixels || !imageSrc) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      (ctx as any).drawImage(
        img,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      canvas.toBlob((blob) => {
        if (blob && image) {
          const croppedFile = new File([blob], image.name, {
            type: "image/jpeg",
          });
          setCroppedImage(croppedFile, index);
        }
      }, "image/jpeg");
    };
  }, [croppedAreaPixels, imageSrc, image, setCroppedImage, index]);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImageSrc(reader.result as string)
      );
      reader.readAsDataURL(image);
    }
  }, [image]);

  return (
    <Dialog open={!!image} onOpenChange={() => setCroppedImage(null, index)}>
      <DialogContent className="sm:max-w-[600px] sm:h-[600px] max-w-[400px] h-[400px]">
        <DialogHeader>
          <DialogTitle>Update Profile Picture</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <div
            className="crop-container"
            style={{
              position: "absolute",
              width: "60%",
              height: "60%",
              border: "2px solid",
            }}
          >
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            )}
          </div>
        </div>

        <DialogFooter className="flex justify-center items-end mt-4">
          {imageSrc && (
            <>
              <Button
                className="bg-red-700 hover:bg-red-600"
                onClick={() => setCroppedImage(null, index)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ImageCropper;
