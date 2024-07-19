import React, { useState } from "react";

interface FilterSelectorProps {
  onFilterChange: (filter: string, subFilter?: string) => void;
}

const FilterSelector: React.FC<FilterSelectorProps> = ({ onFilterChange }) => {
  const [filter, setFilter] = useState("users");
  const [subFilter, setSubFilter] = useState("");

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setSubFilter(""); // Reset subFilter when main filter changes
    onFilterChange(newFilter);
  };

  const handleSubFilterChange = (newSubFilter: string) => {
    setSubFilter(newSubFilter);
    onFilterChange(filter, newSubFilter);
  };

  return (
    <div className="mt-4 flex-col justify-center">
      <div className="w-full flex justify-center">
        <div className="flex space-x-4 gap-3">
          <div
            className={`cursor-pointer p-2 border-2 border-gray-300 rounded-lg  ${filter === "users" ? " font-bold border-gray-400" : ""}`}
            onClick={() => handleFilterChange("users")}
          >
            Users
          </div>
          <div
            className={`cursor-pointer p-2 border-2 border-gray-300 rounded-lg   ${filter === "posts" ? " font-bold border-gray-400" : ""}`}
            onClick={() => handleFilterChange("posts")}
          >
            Products
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        {filter === "posts" && (
          <div className="mt-4 flex space-x-4">
            <div
              className={`cursor-pointer p-2 border-2 border-gray-300 rounded-lg   ${subFilter === "" ? " font-bold border-gray-400" : ""}`}
              onClick={() => handleSubFilterChange("")}
            >
              Sell Product
            </div>
            <div
              className={`cursor-pointer p-2 border-2 border-gray-300 rounded-lg   ${subFilter === "bidding" ? " font-bold border-gray-400" : ""}`}
              onClick={() => handleSubFilterChange("bidding")}
            >
              Bid Product
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSelector;
