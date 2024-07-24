import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/utils/hooks/reduxHooks";
interface UserCardProps {
  userData: {
    imageUrl: string;
    userName: string;
    _id: string;
    firstName?: string;
    lastName?: string;
  };
}


const UserCard: React.FC<UserCardProps> = ({ userData }) => {
  const myId=useAppSelector((state)=>state.auth.user?._id)
  return (
    <>
      <div className="flex justify-center pb-2">
        <div className="flex items-center bg-white shadow-lg rounded-lg p-4">
          {userData.imageUrl ? (
            <img
              className="w-16 h-16 rounded-full object-cover mr-4"
              src={userData.imageUrl}
              alt="User"
            />
          ) : (
            <FaRegUserCircle className="w-16  mr-4 h-16" />
          )}
          <div className=" max-w-40 min-w-40">
            <div className="font-bold text-lg dark:text-black break-words">
              {userData.userName}
            </div>
            {userData.firstName && userData.lastName && (
              <div className="font-semibold text-sm dark:text-black break-words">
                {userData.firstName  } {userData.lastName}
              </div>
            )}
          </div>
          <Link to={`${myId==userData._id?'/profile/my-posts':'/user-profile'}`} state={{ userId: userData._id }}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              View
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserCard;
