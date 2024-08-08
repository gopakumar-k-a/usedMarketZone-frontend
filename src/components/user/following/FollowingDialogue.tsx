import { useState, Dispatch, SetStateAction, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoaderPost from "@/components/loader/LoaderPost";
import { ConversationData, FollowingUser } from "@/types/chat"; // Adjust the import path as needed
import UserCardChatFollowing from "@/components/chat/sideBar/UserCardChatFollowingList";
import { getFollowing } from "@/api/user";

function FollowingUserDialogue({
  isFollowingDialogueOpen,
  onFollowingDialogueClose,
}: {
  isFollowingDialogueOpen: boolean;
  onFollowingDialogueClose: () => void;
}) {
  const [followingUsers, setFollowingUsers] = useState<FollowingUser[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  // let filteredUsers: FollowingUser[] = [];
  useEffect(() => {
    if (isFollowingDialogueOpen) {
      setLoading(true);
      getFollowing()
        .then((res) => {
          setFollowingUsers(res.followingUsers);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch following users", error);
          setLoading(false);
        });
    }
  }, [isFollowingDialogueOpen]);
  const filteredUsers = followingUsers.filter((user: FollowingUser) =>
    user.following.userName.toLowerCase().includes(search.toLocaleLowerCase())
  );

  useEffect(()=>{
    console.log('filtered users ',filteredUsers);
    
  })

  return (
    <Dialog
      open={isFollowingDialogueOpen}
      onOpenChange={onFollowingDialogueClose}
    >
      <DialogContent className="sm:max-w-[800px] h-4/6">
        <DialogHeader>
          <DialogTitle>Chat with Users</DialogTitle>
          <DialogDescription>
            start chating with users you are following
          </DialogDescription>
          <input
            type="text"
            placeholder="Search users..."
            className="input shadow-lg border-gray-300   rounded-xl w-full col-span-3 mt-12"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </DialogHeader>

        <div className="relative overflow-x-auto">
          <div className="sm:min-h-8/12 overflow-y-auto">
            {isLoading ? (
              <LoaderPost />
            ) : (
              <>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <tbody className="">
                    <td></td>
                    {filteredUsers && filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr>
                          <UserCardChatFollowing
                            key={user._id}
                            userData={user.following}
                            onFollowingDialogueClose={onFollowingDialogueClose}
                          />
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="px-6 py-4" colSpan={2}>
                          No following users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default FollowingUserDialogue;
