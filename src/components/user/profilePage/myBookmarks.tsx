import { FaCamera } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getOwnerPostsListImage } from "@/api/profile";
import { getBookmarkImageList } from "@/api/profile";
import { useEffect, useState } from "react";

interface ProductImage {
  _id: string;
  productImageUrls: string[];
}
interface BookmarkImage {
  _id: string;
  bookmarkImageUrls: string[];
  postId:string;
}

// interface OwnerPostsImageList {
//   postImagesList: ProductImage[];
// }

function MyBookmarks() {
  const [bookmarkImageList, setBookmarkImageList] = useState<BookmarkImage[]>(
    []
  );

  const fetchBookmarkImageList = async () => {
    try {
      const { bookmarkImageList }: { bookmarkImageList: BookmarkImage[] } =
        await getBookmarkImageList();
      console.log("bookmarkImageList ", bookmarkImageList);

      setBookmarkImageList(bookmarkImageList);

      console.log("image data ", bookmarkImageList);
    } catch (error) {
      console.error("Error fetching post images list:", error);
    }
  };
  useEffect(() => {
    fetchBookmarkImageList();
  }, []);
  return (
    <>
      {bookmarkImageList.length > 0 ? (
        <>
          <div className="pt-4 w-full flex justify-center">
            {/* <div className="w-4/5 flex justify-center"> */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {bookmarkImageList.map((imageList, index) => (
                <Link
                  key={index}
                  to={"/post/post-details"}
                  state={{ pId: imageList.postId }}
                >
                  <div className="flex items-center justify-center sm:w-60 sm:h-60">
                    <img
                      className="w-full h-full object-contain rounded-lg"
                      src={imageList.bookmarkImageUrls[0]}
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
                No Bookmarks
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MyBookmarks;
