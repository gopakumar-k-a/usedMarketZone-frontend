import  { useEffect, useState } from "react";
import {  useLocation } from "react-router-dom";
import {
  getUserPostsInAdmin,
  getUserProfileInAdmin,
  modifyUserAccess,
} from "@/api/admin";
import { Badge } from "@/components/ui/badge";
import AlertDialogBlock from "@/components/admin/userManagement/AlertDialogBlock";
import { Button } from "@/components/ui/button";
import UserPosts from "@/components/admin/userManagement/UserPosts";

import { User } from "@/types/login";

function UserProfileAdmin() {
  const location = useLocation();
  const { userId } = location.state || "";
  const [user, setUser] = useState<User | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const [userPostObj, setUserPostObj] = useState(null);

  async function fetchUserPosts(userId: string) {
    await getUserPostsInAdmin(userId).then((response) => {
      const { userPosts } = response;
      setUserPostObj(userPosts);
    });
  }

  useEffect(() => {
    getUserProfileInAdmin(userId).then((response) => {
      setUser(response.userData);
      setIsActive(response.userData.isActive);
      fetchUserPosts(response.userData._id)
    });
  }, []);
  const changeIsActive = async (userId: string) => {
    await modifyUserAccess(userId).then(() => {
      setIsActive((prevState) => !prevState);
    });
  };
  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <>
      <h1 className=" text-3xl dark:white  font-bold"> User Details </h1>

      {user && (
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={user?.imageUrl}
                  alt={`${user?.firstName} ${user?.lastName}`}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <div>
                    <h1 className="text-2xl font-bold ">
                      {user?.firstName} {user?.lastName}
                    </h1>
                    <p className="text-gray-600">@{user?.userName}</p>
                  </div>
                  <div>
                    <button>userActive Status</button>
                    <h2 className="text-xl font-semibold mb-2">
                      User Active Status :
                      {isActive ? (
                        <>
                          <Badge className="bg-green-400 mr-2">active</Badge>
                          {/* <button onClick={handleOpenDialog}>block</button> */}
                          <Button
                            variant="outline"
                            onClick={handleOpenDialog}
                            className="bg-red-600 text-white rounded-lg hover:bg-red-700 hover:text-white"
                          >
                            Block
                          </Button>
                        </>
                      ) : (
                        <>
                          <Badge variant="destructive" className="mr-2">
                            blocked
                          </Badge>
                          {/* <button onClick={handleOpenDialog}>UnBlock</button> */}
                          <Button
                            variant="outline"
                            onClick={handleOpenDialog}
                            className="bg-green-600 text-white rounded-lg hover:bg-green-700 hover:text-white"
                          >
                            Un-Block
                          </Button>
                        </>
                      )}
                    </h2>
                    {/* <Badge>active</Badge> */}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Profile Information
                  </h2>
                  <p>
                    <strong>Email:</strong> {user?.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {user?.phone}
                  </p>
                  <p>
                    <strong>Role:</strong> {user?.role}
                  </p>
                  <p>
                    <strong>Bio:</strong> {user?.bio}
                  </p>
                  <p>
                    <strong>Joined:</strong> {user?.createdAt}
                  </p>
                  <p>
                    <strong>Last Updated:</strong> {user?.updatedAt}
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    User Activity /dummy contents /
                  </h2>
                  <p>
                    <strong>Number of Posts:</strong> 12
                  </p>
                  <p>
                    <strong>Number of Bids:</strong> 8
                  </p>
                  <p>
                    <strong>Number of Followers:</strong> 150
                  </p>
                  <p>
                    <strong>Number of Following:</strong> 200
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">
                  Recent Activity /dummy contents /
                </h2>
                <ul className="list-disc list-inside">
                  <li>Posted a new product on 21/6/2024</li>
                  <li>Bid on an auction on 20/6/2024</li>
                  <li>Updated profile picture on 18/6/2024</li>
                </ul>
              </div>
            </div>
          </div>
          {/* <Outlet/> */}
          {userPostObj && <UserPosts userPosts={userPostObj} />}
        </div>
      )}

      {showDialog && user && (
        <AlertDialogBlock
          userData={user}
          isOpen={showDialog}
          onClose={handleCloseDialog}
          changeIsActive={() => changeIsActive(user._id)}
        />
      )}
    </>
  );
}

export default UserProfileAdmin;
