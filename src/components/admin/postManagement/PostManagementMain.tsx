import { handleGetAllProductPostsAdmin } from "@/api/admin";
import { useEffect, useState } from "react";
import BidProductCardAdmin from "./BidProductCardAdmin";
import ProductCardAdmin from "./ProductCardAdmin";
import ProductInterface from "@/types/product";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "../../pagination/Pagination";
import { SortDropdown } from "@/components/sort/SortDropDown";
import { DebouncedSearchInput } from "../../debounceSearch/DebouncedSearchInput";
function PostManagementMain() {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [searchParams] = useSearchParams();
  const fetchAllPosts = async (
    page: number = 1,
    search: string | null = "",
    sort: string|null
  ) => {
    const { productPosts, totalDocuments } =
      await handleGetAllProductPostsAdmin(page, 5, search, sort);
    setProducts(productPosts);
    setTotalDocuments(totalDocuments);
  };
  const options = [
    { value: "createdAt_desc", label: "Newest" },
    { value: "createdAt_asc", label: "Oldest" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
  ];
  useEffect(() => {
    const page = searchParams.get("page")
      ? parseInt(searchParams.get("page")!)
      : 1;
    const search = searchParams.get("search") ? searchParams.get("search") : "";
    const sort = searchParams.get("sort") ? searchParams.get("sort") : "";

    fetchAllPosts(page, search, sort);
  }, [searchParams]);

  return (
    <>
      <div>
        <div className="flex gap-2">
          <DebouncedSearchInput />
          <SortDropdown options={options} />
        </div>
        {products && products.length > 0 ? (
          products.map((product) =>
            product.isBidding ? (
              <BidProductCardAdmin key={product._id} product={product} />
            ) : (
              <ProductCardAdmin key={product._id} product={product} />
            )
          )
        ) : (
          <div>no data found</div>
        )}
        {products && products.length > 0 && (
          <Pagination pageSize={5} totalCount={totalDocuments} />
        )}
      </div>
    </>
  );
}

export default PostManagementMain;
