import { useEffect, useState } from "react";
import ProductInterface from "@/types/product";

function useGetProductAdmin() {
  const [productData, ] = useState<ProductInterface|null>(null);

  const getProduct = async () => {
    try {

    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  return { productData };
}

export default useGetProductAdmin;
