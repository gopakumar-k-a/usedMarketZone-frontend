import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar } from "@/components/ui/avatar"; // Assuming you have an Avatar component
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import { useEffect, useState } from "react";
import { getFollowing } from "@/api/user";
import { FollowingUser } from "@/types/chat";
// Sample users data, replace this with actual data from your application
import { sendPostAsMessage } from "@/api/chat";
import { toast } from "react-toastify";
import LoadingButton from "../loadingButton/LoadingButton";

export function SharePostDialogue({ isOpen, onClose, selectedPostIdShare }) {
  const [loading, setLoading] = useState(false);
  const [recieverId, setRecieverId] = useState("");
  const sharePost = async (productId: string, recieverId: string) => {
    try {
      setRecieverId(recieverId);
      setLoading(true);
      console.log("sharePost in dialogue productId", productId);
      console.log("sharePost in dialogue recieverId", recieverId);
      const res = await sendPostAsMessage(productId, recieverId);

      if (res.message) {
        toast.success(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("cant share post something wrong");
    } finally {
      setLoading(false);
    }
  };
  const [following, setFollowing] = useState<FollowingUser[]>([]);
  const fetchFollowing = async () => {
    const res = await getFollowing();

    console.log("res fetch followin ", res.followingUsers);
    setFollowing(res.followingUsers);
  };
  useEffect(() => {
    fetchFollowing();
  }, []);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Post</DialogTitle>
          <DialogDescription>
            Select a user to share this post with.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {following && following.length > 0 ? (
            <>
              {following.map((user) => (
                <div
                  key={user.following._id}
                  className="flex items-center gap-4 p-4 border rounded-lg"
                >
                  {/* <Avatar src="sdfdsf" alt={user.name} className="w-10 h-10 rounded-full" /> */}
                  <Avatar>
                    <AvatarImage
                      src={user.following.imageUrl}
                      alt="https://github.com/shadcn.png"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="font-semibold">
                      {user.following.userName}
                    </div>
                  </div>

                  {loading && recieverId == user.following._id ? (
                    <LoadingButton buttonText={"Sharing"} />
                  ) : (
                    <Button
                      className="ml-auto"
                      onClick={() =>
                        sharePost(selectedPostIdShare, user.following._id)
                      }
                    >
                      Share Post
                    </Button>
                  )}
                </div>
              ))}
            </>
          ) : (
            <>
              <div>no following users</div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
