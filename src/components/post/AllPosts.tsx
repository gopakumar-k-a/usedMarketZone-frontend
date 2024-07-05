import { getAllPosts } from "@/api/product";
import ProductInterface from "@/types/product";
import { useState, useEffect } from "react";
import BidCard from "./BidCard";
import ProductCard from "./ProductCard";

function AllPosts() {
  const [posts, setPosts] = useState<ProductInterface[]>([]);

  const handleGetAllPosts = async () => {
    const { allPosts } = await getAllPosts();

    console.log("get all products ", allPosts);
    return allPosts;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts: ProductInterface[] = await handleGetAllPosts();
      setPosts(allPosts);
    };

    fetchPosts();
  }, []);
  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="min-w-fit">
          {posts.map((post) =>
            post.isBidding ? (
              <BidCard post={post} />
            ) : (
              <ProductCard post={post} />
            )
          )}
        </div>
      </div>
    </>
  );
}

export default AllPosts;