import ProfileBottom from "@/components/user/profilePage/ProfileBottom";
import ProfileTop from "@/components/user/profilePage/ProfileTop";
import { useCallback, useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { User } from "@/types/login";
import { getUserById } from "@/api/user";
import { useLocation } from "react-router-dom";

function UserProfilePage() {
  const [userData, setUserData] = useState<User | null>(null);
  const [postImagesList, setPostImagesList] = useState([]);
  const location = useLocation();
  const { userId } = location.state;
  const fetchUserDetails = async () => {
    const { userData } = await getUserById(userId);
    console.log("user data is ", userData);
    setUserData(userData);
  };



  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <>
      {userData && <ProfileTop userData={userData} ownerProfile={false} />}

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

export default UserProfilePage;
