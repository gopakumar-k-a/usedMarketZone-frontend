import { Button } from "@/components/ui/button";
import React from "react";

type ProductStatus = "processing" | "not_shipped" | "shipped_to_admin" | "received_by_admin" | "shipped_to_buyer" | "Delivered";

type StatusButtonProps = {
  productStatus: ProductStatus;
  handleNavigate: () => void;
};

const StatusButtonMyBid: React.FC<StatusButtonProps> = ({ productStatus, handleNavigate }) => {
  const getButtonProps = () => {
    switch (productStatus) {
      case "processing":
        return {
          className: "bg-yellow-500 hover:bg-yellow-600 text-white",
          label: "Processing",
        };
      case "not_shipped":
        return {
          className: "bg-red-500 hover:bg-red-600 text-white",
          label: "Not Shipped",
        };
      case "shipped_to_admin":
        return {
          className: "bg-blue-500 hover:bg-blue-600 text-white",
          label: "Shipped to Admin",
        };
      case "received_by_admin":
        return {
          className: "bg-purple-500 hover:bg-purple-600 text-white",
          label: "Received by Admin",
        };
      case "shipped_to_buyer":
        return {
          className: "bg-orange-500 hover:bg-orange-600 text-white",
          label: "Shipped to Buyer",
        };
      case "Delivered":
        return {
          className: "bg-green-500 hover:bg-green-600 text-white",
          label: "Delivered",
        };
      default:
        return {
          className: "bg-gray-500 hover:bg-gray-600 text-white",
          label: "Unknown Status",
        };
    }
  };

  const { className, label } = getButtonProps();

  return (
    <Button className={`px-4 py-2 rounded ${className}`} onClick={handleNavigate}>
      {label}
    </Button>
  );
};

export default StatusButtonMyBid;
