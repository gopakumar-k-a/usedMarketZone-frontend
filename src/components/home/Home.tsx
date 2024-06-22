import React, { useEffect, useState } from "react";
import ProductCard from "../post/ProductCard";
import { getAllPosts } from "@/api/product";

function Home() {
  const [posts, setPosts] = useState([]);

  const handleGetAllPosts = async () => {
    const { allPosts } = await getAllPosts();

    console.log("get all products ", allPosts);
    return allPosts;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await handleGetAllPosts();
      setPosts(allPosts);
    };

    fetchPosts();
  }, []);

  return (
    <>

      <div className="flex items-center justify-center ">
        <div className="min-w-fit">
          {posts.map((post) => {
            return <ProductCard post={post}/>;
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
