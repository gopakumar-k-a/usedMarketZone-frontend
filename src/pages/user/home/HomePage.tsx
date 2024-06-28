import React, { useEffect, useState } from "react";
import ProductCard from "@/components/post/ProductCard";
import BidCard from "@/components/post/BidCard";
import { getAllPosts } from "@/api/product";
import ProductInterface from "@/types/product";
function HomePage() {
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
            <BidCard post={post}/>
            ) : (
              <ProductCard post={post} />
            )
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
