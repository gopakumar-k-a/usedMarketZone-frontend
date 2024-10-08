import React, { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FaScissors } from "react-icons/fa6";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import axios from "axios";
import pLimit from "p-limit";

import { productConditions } from "@/constants/productCategories";
import { productCategories } from "@/constants/productCategories";
import ImageCropper from "./multipleImageCropper/ImageCropper";
import { uploadToCloudinaryAndGetLink } from "./uploadFileToCloudinary/uploadToCloudinaryAndGetLink";
import { bidProductPost } from "@/api/bid";
import { toast } from "react-toastify";
import LoadingButton from "@/components/loadingButton/LoadingButton";
export interface Product {
  productName: string;
  basePrice: number;
  category: string;
  subCategory: string;
  description: string;
  phone: string;
  country: string;
  state: string;
  district: string;
  city: string;
  postalCode: string;
  productCondition: string;
  address?: string;
  productImageUrls?: string[];
  productAge: string;
  bidDuration: {
    day: number;
    hour: number;
    minute: number;
  };
}
export type BidProductPayload = Omit<Product, 'category' | 'subCategory' | 'country' | 'state' | 'district' | 'city' | 'postalCode'> & {
  category: string;
  subCategory: string;
  address?: string;
};


function SellProductPost() {
  const [productImages, setProductImages] = useState<File[]>([]);
  const [selectedImageNo, setSelectedImageNo] = useState<number>(0);
  const [maximumImageError, setMaximumImageError] = useState<boolean>(false);
  const [subCategories, setSubCategories] = useState<string[] | null>([]);
  const [productCondition, setProductCondition] = useState<string | null>("");
  const validImageTypes: string[] = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/bmp",
    "image/tiff",
    "image/svg+xml",
    "image/x-icon",
    "image/heif",
    "image/heic",
  ];

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [croppingImageIndex, setCroppingImageIndex] = useState<number | null>(
    null
  );

  const navigate = useNavigate();

  const uploadFiles = async () => {
    setUploading(true);
    setError(null);

    const limit = pLimit(3); // Limit concurrent uploads to 3
    const promises = productImages.map((file) =>
      limit(() => uploadToCloudinaryAndGetLink(file))
    );

    try {
      const imageUrls = await Promise.all(promises);
      console.log("image urls ", imageUrls);
      return imageUrls;
    } catch (err) {
      if (err instanceof Error) {
        console.error("Upload failed:", err);
        setError(err.message);
      } else {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred.");
      }
    } finally {
      setUploading(false);
      setProductImages([]);
    }
  };

  const postSellProduct = async (values: Product) => {
    console.log("values ", values);

    values.address = Object.values({
      country: values.country,
      state: values.state,
      district: values.district,
      city: values.city,
      postalCode: values.postalCode,
    }).join(", ");

    const toastId = toast.loading("Posting Product...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
    });

    try {
      try {
        values.productImageUrls = (await uploadFiles()) as string[];

        console.log("values after uploading files ", values);
      } catch (uploadError) {
        console.error("Error during image upload: ", uploadError);

        toast.update(toastId, {
          render: "Failed to upload files",
          type: "error",
          autoClose: 5000,
          isLoading: false,
        });

        return;
      }

      const payload:BidProductPayload = {
        productName: values.productName,
        basePrice: values.basePrice,
        category: values.category,
        subCategory: values.subCategory,
        description: values.description,
        productCondition: values.productCondition,
        productImageUrls: values.productImageUrls,
        phone: values.phone,
        address: values.address,
        productAge: values.productAge,
        bidDuration: values.bidDuration,
      };

      await bidProductPost(payload).then(() => {
        navigate("/profile/my-bids");
      });

      toast.update(toastId, {
        render: "Product Bid Request Added Successfully",
        type: "success",
        autoClose: 5000,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error in postSellProduct: ", error);

      toast.update(toastId, {
        render: "Failed to Update Please Check Credentials",
        type: "error",
        autoClose: 5000,
        isLoading: false,
      });
    }
  };

  const validationSchema = Yup.object({
    productName: Yup.string().required("Product Name is required"),
    basePrice: Yup.number().required("Product Price is required").positive(),
    category: Yup.string().required("Category is required"),
    subCategory: Yup.string().required("Sub Category is required"),
    description: Yup.string().required("Description is required"),
    phone: Yup.string().required("Phone Number is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    district: Yup.string().required("District is required"),
    city: Yup.string().required("City is required"),
    postalCode: Yup.string().required("Postal Code is required"),
    productCondition: Yup.string().required("Product Condition is required"),
    productAge: Yup.string().required("Product Age is Required"),
    bidDuration: Yup.object().shape({
      day: Yup.number()
        .required("Days are required")
        .integer("Days must be an integer")
        .min(0, "Days cannot be negative"),
      hour: Yup.number()
        .required("Hours are required")
        .integer("Hours must be an integer")
        .min(0, "Hours cannot be negative")
        .max(23, "Hours cannot be more than 23"),
      minute: Yup.number()
        .required("Minutes are required")
        .integer("Minutes must be an integer")
        .min(0, "Minutes cannot be negative")
        .max(59, "Minutes cannot be more than 59"),
    }),
    productImages: Yup.array().min(1, "Please select at least one image"),
  });

  const formik = useFormik({
    initialValues: {
      productName: "",
      basePrice: 0,
      category: "",
      subCategory: "",
      description: "",
      phone: "",
      country: "",
      state: "",
      district: "",
      city: "",
      postalCode: "",
      productCondition: "",
      productAge: "",
      bidDuration: {
        day: 0,
        hour: 0,
        minute: 0,
      },
      // productImages: [],
    },
    validationSchema,
    onSubmit: postSellProduct,
  });

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
    // formik.setFieldValue("productImages", newImages);
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
            formik.setFieldValue("country", address.country);
            formik.setFieldValue("state", address.state || address.region);
            formik.setFieldValue("district", address.county || address.suburb);
            formik.setFieldValue(
              "city",
              address.city || address.town || address.village
            );
            formik.setFieldValue("postalCode", address.postcode);
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

  const setCroppedImage = (croppedImageFile: File | null, index: number) => {
    if (croppedImageFile) {
      const newImages = [...productImages];
      newImages[index] = croppedImageFile;
      setProductImages(newImages);
      // formik.setFieldValue("productImages", newImages);
    }
    setCroppingImageIndex(null);
  };

  return (
    <>
      <div
        // className="flex justify-center bg-white dark:bg-gray-900 min-h-screen"
        className="w-full flex justify-center bg-white dark:bg-gray-900 overflow-hidden"
      >
        <form
          onSubmit={formik.handleSubmit}
          className="max-w-3xl w-full mx-auto p-6 bg-white text-black rounded-md shadow-md dark:bg-gray-900 dark:text-white"

          // className="max-w-3xl mx-auto bg-white text-black rounded-md shadow-md dark:bg-gray-900 dark:text-white"
        >
          <h2 className="text-2xl font-bold mb-6">Bid Your Product</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium">Product Name</label>
            <input
              className="w-full p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700"
              type="text"
              placeholder="Iphone 11"
              name="productName"
              onChange={formik.handleChange}
              value={formik.values.productName}
            />
            {formik.errors.productName && formik.touched.productName && (
              <div className="text-red-500">{formik.errors.productName}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Product Price</label>
            <input
              className="w-full p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700"
              type="number"
              name="basePrice"
              onChange={formik.handleChange}
              value={formik.values.basePrice}
            />
            {formik.errors.basePrice && formik.touched.basePrice && (
              <div className="text-red-500">{formik.errors.basePrice}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">
              How old is The Product?
            </label>
            <input
              className="w-full p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700"
              type="string"
              name="productAge"
              onChange={formik.handleChange}
              value={formik.values.productAge}
              placeholder="1 year and 6 months"
            />
            <li>
              this field is for other users to know how old is the product
            </li>

            {formik.errors.productAge && formik.touched.productAge && (
              <div className="text-red-500">{formik.errors.productAge}</div>
            )}
          </div>

          <div className="mb-4">
            {/* <CustomDateTimePicker/> */}
            {/* hour picker here  */}
            <label className="block text-sm font-medium">
              Enter The Duration For the Bid
            </label>
            <div className="grid grid-cols-6 gap-2">
              <div className="col-span-1 flex flex-col items-center">
                <input
                  name="bidDuration.day"
                  type="number"
                  className="w-full p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700"
                  onChange={formik.handleChange}
                  value={formik.values.bidDuration.day}
                />
                <span className="dark:text-white"> Day</span>
              </div>
              <div className="col-span-1 flex flex-col items-center">
                <input
                  name="bidDuration.hour"
                  type="number"
                  className="w-full p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700"
                  onChange={formik.handleChange}
                  value={formik.values.bidDuration.hour}
                />
                <span className="dark:text-white"> Hour</span>
                {/* {formik.errors.duration.day && formik.touched.productName && (
            <div className="text-red-500">{formik.errors.productName}</div>
          )} */}
              </div>
              <div className="col-span-1 flex flex-col items-center">
                <input
                  name="bidDuration.minute"
                  type="number"
                  className="w-full p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700"
                  onChange={formik.handleChange}
                  value={formik.values.bidDuration.minute}
                />
                <span className="dark:text-white"> minute</span>
              </div>
              <div className="col-span-3">
                <span className="dark:white">
                  Nb: The bid duration specifies the time from when the admin
                  accepts the bid until the bid ends
                </span>
              </div>
              {formik.errors.bidDuration && (
                <div className="text-red-500 col-span-3">
                  {formik.errors.bidDuration.day ||
                    formik.errors.bidDuration.hour ||
                    formik.errors.bidDuration.minute}
                  {formik.errors.bidDuration &&
                    typeof formik.errors.bidDuration === "string" && (
                      <div className="text-red-500">
                        {formik.errors.bidDuration}
                      </div>
                    )}
                </div>
              )}

              {/* <ErrorMessage name="duration" className="error" /> */}
            </div>
          </div>

          <div className="flex mb-4 space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium">
                Select Category
              </label>
              {/* <select className="w-full p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700">
            <option>Electronics</option>
          </select> */}
              <Select
                name="category"
                onValueChange={(value) => {
                  formik.setFieldValue("category", value);
                  handleCategoryChange(value as keyof typeof productCategories);
                }}
              >
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
              {formik.errors.category && formik.touched.category && (
                <div className="text-red-500">{formik.errors.category}</div>
              )}
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium">
                Select Sub Category
              </label>
              <Select
                name="subCategory"
                onValueChange={(value) =>
                  formik.setFieldValue("subCategory", value)
                }
              >
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
              {formik.errors.subCategory && formik.touched.subCategory && (
                <div className="text-red-500">{formik.errors.subCategory}</div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              className="w-full p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700"
              rows={3}
              placeholder="I'm selling my second-hand iPhone 12, which is in excellent condition"
              name="description"
              onChange={formik.handleChange}
            ></textarea>
            {formik.errors.description && formik.touched.description && (
              <div className="text-red-500">{formik.errors.description}</div>
            )}
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
              {/* {formik.errors.productImages && formik.touched.productImages && (
              <div className="text-red-500 w-full text-center">
                {formik.errors.productImages}
              </div>
            )} */}
            </label>
            {maximumImageError && (
              <h2 className="text-red-600">
                {" "}
                maximum 4 images are only allowed
              </h2>
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
              <Select
                name="productCondition"
                onValueChange={(value) => {
                  handleProductConditionChange(
                    value as keyof typeof productConditions
                  );
                  formik.setFieldValue("productCondition", value);
                }}
              >
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
              {formik.errors.productCondition &&
                formik.touched.productCondition && (
                  <div className="text-red-500">
                    {formik.errors.productCondition}
                  </div>
                )}
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

          <div className="mb-4">
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              name="phone"
              className="w-full p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700"
              type="text"
              placeholder="9647365337"
              onChange={formik.handleChange}
            />
            {formik.errors.phone && formik.touched.phone && (
              <div className="text-red-500">{formik.errors.phone}</div>
            )}
          </div>

          <hr className="my-6 border-gray-200 dark:border-gray-700" />

          {/* address part...... */}

          <div>
            <h3 className="text-xl font-bold mb-4">Enter Your Address</h3>

            <div className="flex mb-4 space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium">Country</label>
                <input
                  name="country"
                  type="text"
                  value={formik.values.country}
                  // value={country&&country}
                  // onChange={(e) => {
                  //   setCountry(e.target.value);
                  // }}
                  onChange={formik.handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {formik.errors.country && formik.touched.country && (
                  <div className="text-red-500">{formik.errors.country}</div>
                )}
              </div>

              <div className="w-1/2">
                <label className="block text-sm font-medium">State</label>
                <input
                  name="state"
                  type="text"
                  // value={state}
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {formik.errors.state && formik.touched.state && (
                  <div className="text-red-500">{formik.errors.state}</div>
                )}
              </div>
            </div>
            {/* 
      country: "",
      state: "",
      district: "",
      city: "",
      postalCode: "",
      productCondition: "", */}
            <div className="flex mb-4 space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium">District</label>
                <input
                  name="district"
                  type="text"
                  // value={district}
                  // onChange={(e) => setDistrict(e.target.value)}
                  value={formik.values.district}
                  onChange={formik.handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {formik.errors.district && formik.touched.district && (
                  <div className="text-red-500">{formik.errors.district}</div>
                )}
              </div>

              <div className="w-1/2">
                <label className="block text-sm font-medium">City</label>
                <input
                  name="city"
                  type="text"
                  // value={city}
                  // onChange={(e) => setCity(e.target.value)}
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {formik.errors.city && formik.touched.city && (
                  <div className="text-red-500">{formik.errors.city}</div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Postal Code</label>
              <input
                name="postalCode"
                type="text"
                // value={postalCode}
                // onChange={(e) => setPostalCode(e.target.value)}
                value={formik.values.postalCode}
                onChange={formik.handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {formik.errors.postalCode && formik.touched.postalCode && (
                <div className="text-red-500">{formik.errors.postalCode}</div>
              )}
            </div>

            <button
              onClick={fetchLocation}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              <IoLocationSharp />
              Use Current Location
            </button>
          </div>
          <span className="text-red-500">
            Note: The bid won't be posted directly; it will be posted only when
            the admin accepts the bid
          </span>
          <div className="flex flex-col justify-center">
            {uploading ? (
              <LoadingButton buttonText="uploading" />
            ) : (
              <Button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white rounded-md"
                disabled={productImages.length < 1}
                // onClick={uploadFiles}
              >
                Post Product
              </Button>
            )}
          </div>
        </form>
      </div>
      {error && <p className="text-red-400">{error}</p>}

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
