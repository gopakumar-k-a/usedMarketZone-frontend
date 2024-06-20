import React, { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import AddressForm from "./AddressForms";

function SellProductPost() {
  const [productImages, setProductImages] = useState<File[]>([]);
  const [selectedImageNo, setSelectedImageNo] = useState<number>(0);
  const [maximumImageError, setMaximumImageError] = useState<boolean>(false);
  const [subCategories, setSubCategories] = useState<string[] | null>([]);
  const [productCondition, setProductCondition] = useState<string | null>("");
  const validImageTypes: string[] = ["image/jpeg", "image/png", "image/gif"];

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

  type ProductCategories = {
    electronics: string[];
    furniture: string[];
    vehicles: string[];
    clothing: string[];
    books: string[];
    sports: string[];
    home_appliances: string[];
    toys: string[];
    beauty_health: string[];
    tools: string[];
  };

  const productCategories: ProductCategories = {
    electronics: [
      "Mobile Phones",
      "Laptops",
      "Tablets",
      "Cameras",
      "Wearables",
      "Accessories",
    ],
    furniture: ["Sofas", "Beds", "Tables", "Chairs", "Cabinets", "Shelves"],
    vehicles: [
      "Cars",
      "Motorcycles",
      "Bicycles",
      "Trucks",
      "Electric Scooters",
    ],
    clothing: [
      "Men's Clothing",
      "Women's Clothing",
      "Children's Clothing",
      "Footwear",
      "Accessories",
    ],
    books: ["Fiction", "Non-Fiction", "Textbooks", "Comics", "Magazines"],
    sports: [
      "Fitness Equipment",
      "Outdoor Gear",
      "Sportswear",
      "Footwear",
      "Accessories",
    ],
    home_appliances: [
      "Refrigerators",
      "Microwaves",
      "Washing Machines",
      "Air Conditioners",
      "Vacuum Cleaners",
    ],
    toys: [
      "Action Figures",
      "Dolls",
      "Puzzles",
      "Board Games",
      "Educational Toys",
    ],
    beauty_health: [
      "Skincare",
      "Makeup",
      "Hair Care",
      "Personal Care",
      "Health Supplements",
    ],
    tools: [
      "Power Tools",
      "Hand Tools",
      "Gardening Tools",
      "Automotive Tools",
      "Measuring Tools",
    ],
  };

  type ProductConditions = {
    New: string;
    likeNew: string;
    veryGood: string;
    Good: string;
    Acceptable: string;
    Fair: string;
    Poor: string;
  };

  const productConditions: ProductConditions = {
    New: "The product is unused and in its original packaging. It is in perfect condition with no signs of wear.",
    likeNew:
      "The product appears to be brand new but may have been used very lightly. There are no visible signs of wear, and it includes all original parts and packaging.",
    veryGood:
      "The product is used but well-maintained. It may show minor signs of use but is still in excellent working condition. Any defects or wear should be minimal.",
    Good: "The product is used and shows some signs of wear, such as scratches, scuffs, or minor cosmetic damage. It is fully functional and any flaws do not affect its performance.",
    Acceptable:
      "The product is visibly used and has significant signs of wear, such as heavy scratches, dents, or other cosmetic damage. It is still functional but may not be in the best condition.",
    Fair: "The product is heavily used and shows substantial wear and tear. It is still operational, but its appearance and performance may be affected by its condition.",
    Poor: "The product is in bad condition with significant damage or defects that may impair its functionality. It may require repairs to be fully functional.",
  };

  const handleCategoryChange = (value: keyof typeof productCategories) => {
    setSubCategories(productCategories[value]);
  };

  const handleProductConditionChange = (
    value: keyof typeof productConditions
  ) => {
    setProductCondition(productConditions[value]);
  };

  return (
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
          <label className="block text-sm font-medium">Product Condition</label>
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
              <h3 className="text-black dark:text-white">{productCondition}</h3>
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
      {/* <h3 className="text-xl font-bold mb-4">Enter Your Address</h3>

      <div className="flex mb-4 space-x-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium">Select Country</label>
          <Select>
            <SelectTrigger className=" p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700">
              <SelectValue placeholder="none" />
            </SelectTrigger>
            <SelectContent className="w-full p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700">
              <SelectItem value="india">india</SelectItem>
              <SelectItem value="sreelanka">sreelanka</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium">Select State</label>
          <Select>
            <SelectTrigger className=" p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700">
              <SelectValue placeholder="none" />
            </SelectTrigger>
            <SelectContent className="w-full p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700">
              <SelectItem value="kerala">kerala</SelectItem>
              <SelectItem value="tamilnadu">tamilnadu</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex mb-4 space-x-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium">Select City</label>
          <Select>
            <SelectTrigger className=" p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700">
              <SelectValue placeholder="none" />
            </SelectTrigger>
            <SelectContent className="w-full p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700">
              <SelectItem value="kochi">kochi</SelectItem>
              <SelectItem value="chennai">chennai</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium">Enter Landmark</label>
          <input
            className="w-full p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700"
            type="text"
            placeholder="Near church"
          />
        </div>
      </div>

      <div className="flex mb-4 space-x-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium">Enter Postal Code</label>
          <input
            className="w-full p-2 bg-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700"
            type="text"
            placeholder="680672"
          />
        </div>
        <div className="w-1/2 flex items-end">
          <button className="p-2 bg-blue-600 text-white rounded-md">
            Choose Your Current Location
          </button>
        </div>
      </div> */}

      {/* address part end */}

      <AddressForm/>

      <button className="w-full p-2 bg-blue-600 text-white rounded-md">
        Post Product
      </button>
    </div>
  );
}

export default SellProductPost;
