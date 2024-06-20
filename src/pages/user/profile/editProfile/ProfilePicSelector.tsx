import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import "react-easy-crop/react-easy-crop.css"; // Import styles for react-easy-crop
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { updateImageToCloudinary, sendImageUrlToBackEnd } from "@/api/profile";
import { Constants } from "../../../../constants/config";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import { updateUserCredentials } from "@/redux/reducers/auth/authSlice";

function ProfilePicSelector() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const [completedCrop, setCompletedCrop] = useState<any>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [image, setImage] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const validImageTypes: string[] = [
    "image/jpeg",
    "image/png",
    "image/bmp",
    "image/webp",
    "image/tiff",
    "image/svg+xml",
  ];
  const [validImageError, setValidImageError] = useState<boolean>(false);

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleSaveChanges = useCallback(() => {
    if (!croppedAreaPixels || !image) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = image;

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

      canvas.toBlob(async (blob) => {
        if (blob) {
          const formData = new FormData();
          formData.append("file", blob);
          formData.append("upload_preset", Constants.CLOUDINARY_UPLOAD_PRESET);

          try {
            toast
              .promise(
                (async () => {
                  const imageUrl = await updateImageToCloudinary(formData);
                  const response = await sendImageUrlToBackEnd(
                    imageUrl.secure_url
                  );
                  return response;
                })(),
                {
                  pending: "Updating user image",
                  success: "User image updated successfully",
                  error: "Failed to update profile image",
                },
                {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                }
              )
              .then((response: any) => {
                console.log("response in toast image ", response);
                const { updatedUser } = response;
                dispatch(updateUserCredentials(updatedUser));
                navigate("/profile");
              })
              .catch((error) => {
                console.error(error);
              });
          } catch (error) {
            console.error("Error uploading to Cloudinary:", error);
          }
        }
      }, "image/jpeg");
    };
  }, [croppedAreaPixels, image, dispatch, navigate]);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setValidImageError(false);
      if (!validImageTypes.includes(file.type)) {
        setValidImageError(true);
        return;
      }
      const reader = new FileReader();
      reader.addEventListener("load", () => setImage(reader.result as string));
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="blue">
          <FontAwesomeIcon icon={faCamera} className="text-black " />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] sm:h-[600px] max-w-[400px] h-[400px]V\">
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
            {image ? (
              <>
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </>
            ) : (
              <div
                className="upload-placeholder"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Label
                  htmlFor="file-upload"
                  className="upload-label flex justify-center items-center"
                >
                  <FontAwesomeIcon
                    icon={faCamera}
                    className="text-black w-3/4 h-3/4 dark:text-white "
                  />
                  <Input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    className="file-input"
                    style={{ display: "none" }}
                  />
                </Label>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex justify-center items-end mt-4 ">
          {
            validImageError?(<h3 className="text-red-600 w-full">only image files are allowed try selecting jped/png/webp format</h3>):(
              !image ? (
                <h1 className="text-black dark:text-white">
                  Click the camera Icon to select Image
                </h1>
              ) : (
                <h1 className="text-black dark:text-white">
                  scroll or pinch to zoom, and drag to position image
                </h1>
              )

            )
          }
          
          {/* {!image ? (
            <h1 className="text-black dark:text-white">
              Click the camera Icon to select Image
            </h1>
          ) : (
            <h1 className="text-black dark:text-white">
              scroll or pinch to zoom, and drag to position image
            </h1>
          )} */}

          {image && (
            <Button
              className="bg-red-700 hover:bg-red-600"
              onClick={() => setImage(null)}
            >
              cancel
            </Button>
          )}

          <Button onClick={handleSaveChanges} disabled={!image}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProfilePicSelector;
