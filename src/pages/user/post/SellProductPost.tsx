import React, { useState, useEffect } from "react";
import { FaCamera  } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FaScissors } from "react-icons/fa6";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// import AddressForm from "./AddressForms";
// import AddressForm from "./AddressForm";
// import { Import, User } from "lucide-react";
import axios from "axios";
import pLimit from "p-limit";
// import { Constants } from "@/constants/config";
// import { updateImageToCloudinary } from "@/api/profile";
import { productConditions } from "@/constants/productCategories";
import { productCategories } from "@/constants/productCategories";
import ImageCropper from "./multipleImageCropper/ImageCropper";
import { uploadToCloudinaryAndGetLink } from "./uploadFileToCloudinary/uploadToCloudinaryAndGetLink";

function SellProductPost() {
  const [productImages, setProductImages] = useState<File[]>([]);
  const [selectedImageNo, setSelectedImageNo] = useState<number>(0);
  const [maximumImageError, setMaximumImageError] = useState<boolean>(false);
  const [subCategories, setSubCategories] = useState<string[] | null>([]);
  const [productCondition, setProductCondition] = useState<string | null>("");
  const validImageTypes: string[] = ["image/jpeg", "image/png", "image/gif"];

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const [uploadedImagesUrl, setUploadedImagesUrl] = useState<string[]>([]);

  const [croppingImageIndex, setCroppingImageIndex] = useState<number | null>(
    null
  );
  // const handleFileChange = (event) => {
  //   setFiles(Array.from(event.target.files)); // Convert FileList to array
  // };

  const uploadFiles = async () => {
    setUploading(true);
    setError(null);

    const limit = pLimit(3); // Limit concurrent uploads to 3
    const promises = productImages.map((file) => limit(() => uploadToCloudinaryAndGetLink(file)));

    try {
      const imageUrls = await Promise.all(promises);
      console.log("image urls ", imageUrls);

      setUploadedImagesUrl(imageUrls);
      console.log("uploadedImagesUrl ", uploadedImagesUrl);
    } catch (err) {
      console.error("Upload failed:", err);
      setError(err.message); 
    } finally {
      setUploading(false);
      setProductImages([]); 
    }
  };


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMaximumImageError(false);

      const files = Array.from(e.target.files);
      const validImages = files.filter((file) =>
        validImageTypes.includes(file.type)
      );

      if (validImages.length + selectedImageNo > 4) {
        setErrorFromImageCount(validImages.length + selectedImageNo);
        return;
      }

      setProductImages([...productImages, ...validImages.slice(0, 4)]);
    }
  };
  const setErrorFromImageCount = (imageCount: number) => {
    if (imageCount > 4) {
      setMaximumImageError(true);
    } else {
      setMaximumImageError(false);
    }
  };
  useEffect(() => {
    setSelectedImageNo(productImages.length);
  }, [productImages]);

  const handleImageRemove = (index: number) => {
    const newImages = productImages.filter((_, i) => i !== index);
    setProductImages(newImages);
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        axios
          .get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`
          )
          .then((response) => {
            const address = response.data.address;
            setCountry(address.country);
            setState(address.state || address.region);
            setDistrict(address.county || address.suburb);
            setCity(address.city || address.town || address.village);
            setPostalCode(address.postcode);
          })
          .catch((error) =>
            console.error("Error fetching location data:", error)
          );
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleCategoryChange = (value: keyof typeof productCategories) => {
    setSubCategories(productCategories[value]);
  };

  const handleProductConditionChange = (
    value: keyof typeof productConditions
  ) => {
    setProductCondition(productConditions[value]);
  };

  const cloudinaryConfig = {
    cloudName: "dwjw8biat",
    uploadPreset: "u9g90r4d", // Optional, if using a preset
    apiKey: "359379445312476",
    apiSecret: "7sQagvPX-Ji1fnG3FDGf7iRggo0",
  };

  const setCroppedImage = (croppedImageFile: File | null, index: number) => {
    if (croppedImageFile) {
      const newImages = [...productImages];
      newImages[index] = croppedImageFile;
      setProductImages(newImages);
    }
    setCroppingImageIndex(null);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto p-6 bg-white text-black rounded-md shadow-md dark:bg-gray-900 dark:text-white">
        <h2 className="text-2xl font-bold mb-6">Post Your Product</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium">Product Name</label>
          <input
            className="w-full p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700"
            type="text"
            placeholder="Iphone 11"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Product Price</label>
          <input
            className="w-full p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700"
            type="number"
            placeholder="38000"
          />
        </div>

        <div className="flex mb-4 space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium">Select Category</label>
            {/* <select className="w-full p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700">
            <option>Electronics</option>
          </select> */}
            <Select onValueChange={handleCategoryChange}>
              <SelectTrigger className=" p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700">
                <SelectValue placeholder="none" />
              </SelectTrigger>
              <SelectContent className="w-full p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700">
                {Object.keys(productCategories).map((value, index) => (
                  <SelectItem value={value} key={index}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium">
              Select Sub Category
            </label>
            <Select>
              <SelectTrigger className="p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700">
                <SelectValue placeholder="none" />
              </SelectTrigger>
              <SelectContent className="w-full p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700">
                {/* <SelectItem value="light">mobile</SelectItem>
              <SelectItem value="dark">head phone</SelectItem>
              <SelectItem value="system">laptop</SelectItem> */}

                {subCategories &&
                  subCategories.map((value: string, index: number) => (
                    <SelectItem key={index} value={value}>
                      {value}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            className="w-full p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700"
            rows="3"
            placeholder="I'm selling my second-hand iPhone 12, which is in excellent condition"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">
            Choose Images of Product (up to 4)
          </label>
          {selectedImageNo > 0 && (
            <label className="block text-sm font-medium">
              Selected ({selectedImageNo} of 4)
            </label>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
            id="file-input"
          />
          <label htmlFor="file-input" className="cursor-pointer">
            <div className="w-2/5 m-auto rounded-xl bg-gray-600 mb-2 border-2 border-gray-700 flex items-center justify-center ">
              <FaCamera className=" ml-2 text-4xl my-auto  text-white" />
              <h1 className="text-base p-4 text-white">
                Click here to select images (upto 4)
              </h1>
            </div>
          </label>
          {maximumImageError && (
            <h2 className="text-red-600"> maximum 4 images are only allowed</h2>
          )}
          <div className="flex space-x-2">
            {productImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Product"
                  className="w-16 h-16 rounded-md"
                />
                        <button
            onClick={() => setCroppingImageIndex(index)}
            className="absolute top-0 left-0 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
          >
            <FaScissors />
          </button>
                <button
                  onClick={() => handleImageRemove(index)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-1/2 mx-2 my-2">
            <label className="block text-sm font-medium">
              Product Condition
            </label>
            <Select onValueChange={handleProductConditionChange}>
              <SelectTrigger className=" p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700">
                <SelectValue placeholder="none" />
              </SelectTrigger>
              <SelectContent className="w-full p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700">
                {Object.keys(productConditions).map(
                  (condition: string, index: number) => (
                    <SelectItem value={condition} key={index}>
                      {condition}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="w-1/2 mx-2 my-2">
            {productCondition && (
              <div className="bg-gray-300 rounded-lg p-2">
                <h3 className="font-medium">condition Description</h3>
                <h3 className="text-black dark:text-white">
                  {productCondition}
                </h3>
              </div>
            )}
          </div>
        </div>

        {/* <div className="mb-4">
        <label className="block text-sm font-medium">Tag Users</label>
        <button className="p-2 bg-blue-600 text-white rounded-md">
          Tag Users
        </button>
      </div> */}

        <div className="mb-4">
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            className="w-full p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700"
            type="text"
            placeholder="9647365337"
          />
        </div>

        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        {/* address part...... */}
        <div>
          <h3 className="text-xl font-bold mb-4">Enter Your Address</h3>

          <div className="flex mb-4 space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium">Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="flex mb-4 space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium">District</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Postal Code</label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            onClick={fetchLocation}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            <IoLocationSharp />
            Use Current Location
          </button>
        </div>

        <Button
          className="w-full p-2 bg-blue-600 text-white rounded-md"
          disabled={productImages.length < 1}
          onClick={uploadFiles}
        >
          Post Product
        </Button>
      </div>
      {croppingImageIndex !== null && (
        <ImageCropper
          image={productImages[croppingImageIndex]}
          setCroppedImage={setCroppedImage}
          index={croppingImageIndex}
        />
      )}
    </>
  );
}

export default SellProductPost;
