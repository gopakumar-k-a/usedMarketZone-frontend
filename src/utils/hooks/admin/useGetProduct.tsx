import { useEffect, useState } from "react";
import ProductInterface from "@/types/product";

function useGetProductAdmin(productId: string) {
  const [productData, setProuductData] = useState<ProductInterface|null>(null);

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
