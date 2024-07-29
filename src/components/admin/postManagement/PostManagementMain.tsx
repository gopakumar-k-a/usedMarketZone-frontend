import { handleGetAllProductPostsAdmin } from "@/api/admin";
import { useEffect, useState } from "react";
import BidProductCardAdmin from "./BidProductCardAdmin";
import ProductCardAdmin from "./ProductCardAdmin";
import ProductInterface from "@/types/product";
function PostManagementMain() {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const fetchAllPosts = async () => {
    const { productPosts } = await handleGetAllProductPostsAdmin();
    setProducts(productPosts);
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);


  return (
    <>
      <h1>post management main</h1>
      <div>
        {products &&
          products.length > 0 &&
          products.map((product) =>
            product.isBidding ? (
              <BidProductCardAdmin key={product._id} product={product} />
            ) : (
              <ProductCardAdmin key={product._id} product={product} />
            )
          )}
      </div>
    </>
  );
}

export default PostManagementMain;
