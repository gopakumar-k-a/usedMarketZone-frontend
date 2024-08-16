import { useEffect, useState } from "react";
import UserCard from "./SuggestedUserCard";
import { getSuggestedUsers } from "@/api/user";

function SuggestedUsers() {
  interface UserCard {
    imageUrl: string;
    userName: string;
    _id: string;
  }
  const [suggestedUsers, setSuggestedUsers] = useState<UserCard[]>([]);
  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const { suggestedUsers } = await getSuggestedUsers();
        setSuggestedUsers(suggestedUsers);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSuggestedUsers();
  }, []);
  return (
    <>
      <div className="flex justify-center">
        {/* <div className="flex justify-center w-4/5 rounded-xl h-screen bg-gray-300 pr-4 pt-4"> */}
        <div className="flex flex-col justify-center items-stretch h-fit bg-gray-300 p-4 rounded-xl w-4/5">
          <div className="w-full max-w-md">
            {/* <div className="bg-red-500 h-full w-1/4"> */}
            <h2 className="font-medium text-lg pt-4 ml-4 mb-4 dark:text-black">
              suggested users
            </h2>
            {/* <UserCard
        imageUrl="https://via.placeholder.com/150" // Replace with actual image URL
        userName="John Doe"
        onViewClick={handleViewClick}
      /> */}
            {suggestedUsers &&
              suggestedUsers.length > 0 &&
              suggestedUsers.map((userData) => (
                <UserCard key={userData._id} userData={userData} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SuggestedUsers;
