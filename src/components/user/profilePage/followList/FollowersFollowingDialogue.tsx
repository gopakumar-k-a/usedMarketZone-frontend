import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
// import { User } from "@/types/user"; // Ensure this path is correct
import { FollowingUser, FollowerUsers } from "@/types/chat";
// import { getFollowingUsers,  } from "@/api/user"
import { getFollowers, getFollowing } from "@/api/user";
import UserCard from "../../SuggestedUserCard";

import { FollowUser } from "@/types/chat";
import { motion } from "framer-motion";

const FollowersFollowingDialogue = ({
  isOpen,
  onClose,
  initialActiveTab,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialActiveTab: "followers" | "following";
}) => {
  // Initialize the component's state with the initialActiveTab prop
  const [activeTab, setActiveTab] = useState<"followers" | "following">(
    initialActiveTab
  );
  const [followers, setFollowers] = useState<FollowUser[] | null>(null);
  const [following, setFollowing] = useState<FollowUser[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      if (activeTab === "followers") {
        const { followerUsers } = await getFollowers();
        setFollowers(
          followerUsers.map((user: FollowerUsers) => user.followers)
        );
      } else if (activeTab === "following") {
        const { followingUsers } = await getFollowing();
        setFollowing(
          followingUsers.map((user: FollowingUser) => user.following)
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [activeTab]);

  const renderUsers = (users: FollowUser[] | null) => {
    if (loading) return <p>Loading...</p>;
    if (!users || users.length === 0) return <p>No users to display.</p>;

    return (
      <motion.div
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{
          type: "spring",
          stiffness: 70,
          damping: 10,
          mass: 0.5,
        }}
      >
        {users.map((user) => (
          <UserCard key={user._id} userData={user} />
        ))}
      </motion.div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Followers and Following</DialogTitle>
          <DialogDescription>
            View the list of users who follow you and those you follow.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-around py-4">
          <button
            className={`px-4 py-2 ${activeTab === "followers" ? "font-bold underline" : ""}`}
            onClick={() => setActiveTab("followers")}
          >
            Followers
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "following" ? "font-bold underline" : ""}`}
            onClick={() => setActiveTab("following")}
          >
            Following
          </button>
        </div>
        <div className="grid gap-4 py-4">
          <div className="h-64 overflow-y-auto">
            {activeTab === "followers" ? (
              followers && followers.length > 0 ? (
                renderUsers(followers)
              ) : (
                <div> no followers </div>
              )
            ) : following && following.length > 0 ? (
              renderUsers(following)
            ) : (
              <div> no followers </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FollowersFollowingDialogue;
