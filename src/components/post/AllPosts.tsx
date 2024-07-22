import { getAllPosts } from "@/api/product";
import ProductInterface from "@/types/product";
import { useState, useEffect } from "react";
import BidCard from "./BidCard";
import ProductCard from "./ProductCard";
import { SharePostDialogue } from "./SharePostModal";

function AllPosts() {
  const [posts, setPosts] = useState<ProductInterface[]>([]);
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [selectedPostIdShare, setSelectedPostIdShare] = useState("");
  const handleShareModalClose = () => {
    setShareModalOpen(false);
  };

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

  const postIdCallBack = (postId: string) => {
    console.log(" postIdCallBack", postId);
    setSelectedPostIdShare(postId);
  };
  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="min-w-fit">
    
          {posts.map((post) =>
            post.isBidding ? (
              <BidCard
                key={post._id}
                post={post}
                setShareModalOpen={setShareModalOpen}
                postIdCallBack={postIdCallBack}
              />
            ) : (
              <ProductCard
                key={post._id}
                post={post}
                setShareModalOpen={setShareModalOpen}
                postIdCallBack={postIdCallBack}

              />
            )
          )}
        </div>
      </div>
      {isShareModalOpen && selectedPostIdShare&&(
        <SharePostDialogue
          isOpen={isShareModalOpen}
          onClose={handleShareModalClose}
          selectedPostIdShare={selectedPostIdShare}
        />
      )}
    </>
  );
}

export default AllPosts;
