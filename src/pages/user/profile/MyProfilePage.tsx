import { useState, useEffect } from "react";

import ProfileTop from "@/components/user/profilePage/ProfileTop";
import { User } from "@/types/login";
import { getOwnerPostsListImage } from "@/api/profile";
import { getNumOfFollow } from "@/api/user";
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Console } from "console";

function ProfilePage() {
  const [userData, setUserData] = useState<User | null>(null);
  const [postImagesList, setPostImagesList] = useState([]);
  const location = useLocation();

  const getPostImageList = async () => {
    try {
      const { ownerPostsImageList } = await getOwnerPostsListImage();
      console.log("ownerPostsImageList ", ownerPostsImageList);

      setPostImagesList(ownerPostsImageList);
      // setPostImagesList([]);
      console.log("image data ", postImagesList);
    } catch (error) {
      console.error("Error fetching post images list:", error);
    }
  };

  useEffect(() => {
    const userString = localStorage.getItem("user");

    if (userString) {
      const fetchNoOfFollow = async (userObj: User) => {
        try {
          const { numOfFollow } = await getNumOfFollow(userObj._id);
          const { numOfFollowing, numOfFollowers } = numOfFollow;
          const updatedUserObj = { ...userObj, numOfFollowers, numOfFollowing };
          setUserData(updatedUserObj);
          getPostImageList();
        } catch (e) {
          console.error("Failed to fetch number of followers/following:", e);
        }
      };

      const userString = localStorage.getItem("user");
      if (userString) {
        try {
          const userObj = JSON.parse(userString);
          console.log("user obj ", userObj);
          fetchNoOfFollow(userObj);
        } catch (e) {
          console.error("Failed to parse user data:", e);
        }
      }
    }

    console.log("location.pathname", location.pathname);
  }, []);

  return (
    <>
      {userData && <ProfileTop userData={userData} ownerProfile={true} />}
      <div className="flex justify-center w-full mt-4">
        <ul
          className={`flex flex-wrap text-sm font-medium text-center   border-b border-gray-200 dark:border-gray-700 dark:text-gray-400`}
        >
          <li className="me-2">
            <Link to={"/profile/my-posts"}>
              <div
                aria-current="page"
                className={`inline-block p-4   rounded-t-lg  ${location.pathname == "/profile/my-posts" ? "text-blue-600 active bg-gray-100 dark:bg-gray-800 dark:text-blue-500" : ""} `}
              >
                Posts
              </div>
            </Link>
          </li>
          <li className="me-2">
            <Link to={"/profile/my-bookmarks"}>
              <div
                aria-current="page"
                className={`inline-block p-4   rounded-t-lg  ${location.pathname == "/profile/my-bookmarks" ? "text-blue-600 active bg-gray-100 dark:bg-gray-800 dark:text-blue-500" : ""} `}
              >
                Bookmarks
              </div>
            </Link>
          </li>
          <li className="me-2">
            <Link to={"/profile/my-bids"}>
              <div
                aria-current="page"
                className={`inline-block p-4   rounded-t-lg  ${location.pathname == "/profile/my-bids" ? "text-blue-600 active bg-gray-100 dark:bg-gray-800 dark:text-blue-500" : ""} `}
              >
                Bid Status
              </div>
            </Link>
          </li>
        </ul>

        {/* <Tabs defaultValue="account" className=" mt-4">
          <TabsList>
            <Link to={"/profile/my-posts"}>
              <TabsTrigger value="account">Posts</TabsTrigger>
            </Link>
            <Link to={"/profile/my-bookmarks"}>
              <TabsTrigger value="password">Bookmarks</TabsTrigger>
            </Link>
          </TabsList>
        </Tabs> */}
      </div>
      <Outlet />

      {/* {postImagesList.length > 0 ? (
        <div className="pt-4 w-full flex justify-center">
          <div className="w-4/5 flex justify-center">
          </div>
        </div>
      ) : (
        // <ProfileBottom postImagesList={postImagesList} />

        <div className="w-full flex justify-center mb-10">
          <div className="border-2 border-gray-300 dark:border-white mt-4 rounded-lg w-2/3 h-28 flex flex-col justify-center items-center">
            <FaCamera className="h-10 w-10 text-gray-600 dark:text-gray-300 mb-2" />
            <span className="text-gray-700 dark:text-gray-300 text-lg">
              No posts
            </span>
          </div>
        </div>
      )} */}
    </>
  );
}

export default ProfilePage;
