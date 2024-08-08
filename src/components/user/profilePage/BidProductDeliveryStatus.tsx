import { ProductStatus } from "@/types/bid";
import React from "react";

type ProductStatusProps = {
  productStatus: ProductStatus;
};

const ProductStatusComponent: React.FC<ProductStatusProps> = ({
  productStatus,
}) => {
  return (
    <div className="product-status">
      {productStatus === "processing" && (
        <div className="flex justify-end">
          <p className="m-2 text-red-500">Waiting for winner to make payment</p>
        </div>
      )}
      {productStatus === "not_shipped" && (
        <div className="flex justify-end">
          <p className="m-2">The product has not been shipped yet.</p>
        </div>
      )}
      {productStatus === "shipped_to_admin" && (
        <div className="flex justify-end">
          <p className="m-2">The product has been shipped to the admin.</p>
        </div>
      )}
      {productStatus === "received_by_admin" && (
        <div className="flex justify-end">
          <p className="m-2">The product has been received by the admin.</p>
        </div>
      )}
      {productStatus === "shipped_to_buyer" && (
        <div className="flex justify-end">
          <p className="m-2">The product has been shipped to the buyer.</p>
        </div>
      )}
      {productStatus === "Delivered" && (
        <div className="flex justify-end">
          <p className="m-2">The product has been delivered.</p>
        </div>
      )}
    </div>
  );
};

export default ProductStatusComponent;
