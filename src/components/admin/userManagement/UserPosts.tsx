import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPostDetailsDialogue } from "./UserPostDetailsDialogue";
import { getUserPostDetailsInAdmin } from "@/api/admin";
import ProductInterface from "@/types/product";
const UserPosts = ({ userPosts }: { userPosts: ProductInterface[] }) => {
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  //   const [modalPostId, setModalPostId] = useState("");
  const [modalPostDetails, setModalPostDetails] = useState(null);

  const fetchPostDetailsAndOpenModal = async (postId: string) => {
    await getUserPostDetailsInAdmin(postId).then((response) => {
      console.log("response in post details ", response.postDetails);

      setModalPostDetails(response.postDetails);

      setDetailsModalOpen(true);
    });
  };

  const onDetailsModalClose = () => {
    setDetailsModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {userPosts && userPosts.length > 0 ? (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">User Posts</h2>
          <ul className="space-y-4">
            {userPosts.map((post) => (
              <li key={post._id} className="bg-white p-6 rounded-lg shadow-md">
                {post?.isBidding ? (
                  <div className="flex justify-end">
                    <span className="text-red-500 dark:text-red-500 font-bold px-2 py-1 text-xs border border-red-500 dark:border-red-500 rounded-full">
                      BID
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <span className="text-black dark:text-white font-bold px-2 py-1 text-xs border border-black dark:border-white rounded-full">
                      SALE
                    </span>
                  </div>
                )}

                <div className="flex items-center space-x-4 mb-4">
                  {post.productImageUrls.length > 0 && (
                    <img
                      src={post.productImageUrls[0]}
                      alt={post.productName}
                      className="w-24 h-24 rounded object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold">
                      {post.productName}
                    </h3>

                    <p className="text-gray-600">
                      Posted Date: {post.createdAt}
                    </p>
                    <p className="text-gray-600">Category: {post.category}</p>
                    <p className="text-gray-600">
                      Sub-Category: {post.subCategory}
                    </p>
                  </div>
                  <div className=" w-full flex justify-end">
                    <Button
                      onClick={() => fetchPostDetailsAndOpenModal(post._id)}
                    >
                      details
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <p>
                    <strong>Base Price:</strong> ${post.basePrice}
                  </p>
                  {/* <p><strong>Address:</strong> {post.address}</p> */}
                  <p>
                    <strong>Sold:</strong> {post.isSold ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Blocked:</strong> {post.isBlocked ? "Yes" : "No"}
                  </p>{" "}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h2 className="text-2xl font-bold mb-4">No Posts</h2>
      )}
      {isDetailsModalOpen && modalPostDetails && (
        <UserPostDetailsDialogue
          isOpen={isDetailsModalOpen}
          onClose={onDetailsModalClose}
          postDetails={modalPostDetails}
        />
      )}
    </div>
  );
};

export default UserPosts;
