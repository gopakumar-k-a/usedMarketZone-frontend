import { getFollowing } from "@/api/user";
import { useState } from "react";
import { toast } from "react-toastify";
import { FollowingUser } from "@/types/chat";

function useGetFollowing() {
  const [isLoading, setIsLoading] = useState(false);
  const [following, setFollowing] = useState<FollowingUser[]>([]);

  const fetchFollowing = async () => {
    setIsLoading(true);
    try {
      const res= await getFollowing();
      console.log('following users ',res);
      
      setFollowing(res.followingUsers);
    //   toast.success(message || "UsersDataFetchedSuccess");
    } catch (error) {
      console.error("Error blocking the post:", error);
      toast.error("Failed to get Following List");
    }
  };
  setIsLoading(false);
//   fetchFollowing()

  return { fetchFollowing, isLoading, following };
}

export default useGetFollowing;
