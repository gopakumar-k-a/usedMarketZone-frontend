import { FaCamera } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getOwnerPostsListImage } from "@/api/profile";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface ProductImage {
  _id: string;
  productImageUrls: string[];
  isBidding: boolean;
}

// interface OwnerPostsImageList {
//   postImagesList: ProductImage[];
// }

export default function Myposts() {
  const [postImagesList, setPostImagesList] = useState<ProductImage[]>([]);

  const getPostImageList = async () => {
    try {
      const { ownerPostsImageList }: { ownerPostsImageList: ProductImage[] } =
        await getOwnerPostsListImage();
      console.log("ownerPostsImageList ", ownerPostsImageList);

      setPostImagesList(ownerPostsImageList);
      // setPostImagesList([]);
      console.log("image data ", postImagesList);
    } catch (error) {
      console.error("Error fetching post images list:", error);
    }
  };
  useEffect(() => {
    getPostImageList();
  }, []);
  return (
    <>
      {postImagesList.length > 0 ? (
        <>
          <div className="pt-4 w-full flex justify-center">
            {/* <div className="w-4/5 flex justify-center"> */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {postImagesList.map((imageList, index) => (
                <Link
                  key={index}
                  to={"/post/post-details"}
                  state={{ pId: imageList._id }}
                >
                  <div className="relative flex items-center justify-center sm:w-60 sm:h-60">
                    <div className="absolute top-0 right-0 m-2">
                      {imageList.isBidding ? (
                       <Badge variant="destructive">bid</Badge>
                      ) : (
                        <Badge>sell</Badge>
                      )}
                    </div>
                    <img
                      className="w-full h-full object-contain rounded-lg"
                      src={imageList.productImageUrls[0]}
                      alt={`image ${index}`}
                    />
                  </div>
                </Link>
              ))}
            </div>
            {/* </div> */}
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex justify-center mb-10">
            <div className="border-2 border-gray-300 dark:border-white mt-4 rounded-lg w-2/3 h-28 flex flex-col justify-center items-center">
              <FaCamera className="h-10 w-10 text-gray-600 dark:text-gray-300 mb-2" />
              <span className="text-gray-700 dark:text-gray-300 text-lg">
                No posts
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
