import { useState, useEffect } from "react";

import { FaCamera } from "react-icons/fa";
import ProfileTop from "@/components/user/profilePage/ProfileTop";
import ProfileBottom from "@/components/user/profilePage/ProfileBottom";
import { User } from "@/types/login";
import { getOwnerPostsListImage } from "@/api/profile";
import { getNumOfFollow } from "@/api/user";

function ProfilePage() {
  const [userData, setUserData] = useState<User | null>(null);
  const [postImagesList, setPostImagesList] = useState([]);

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
  }, []);

  return (
    <>
      {userData && <ProfileTop userData={userData} ownerProfile={true} />}

      {postImagesList.length > 0 ? (
        <ProfileBottom postImagesList={postImagesList} />
      ) : (
        <div className="w-full flex justify-center mb-10">
          <div className="border-2 border-gray-300 dark:border-white mt-4 rounded-lg w-2/3 h-28 flex flex-col justify-center items-center">
            <FaCamera className="h-10 w-10 text-gray-600 dark:text-gray-300 mb-2" />
            <span className="text-gray-700 dark:text-gray-300 text-lg">
              No posts
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilePage;
