import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { BsChatLeftTextFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useUpdateConversation from "@/utils/hooks/chat/useAddConversation";
import { ConversationData } from "@/types/chat";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import { setChatSelected } from "@/redux/reducers/chat/chatSlice";

interface UserCardProps {
  userData: {
    imageUrl: string;
    userName: string;
    _id: string;
    firstName: string;
    lastName: string;
    createdAt: string;
  };
  onFollowingDialogueClose: () => void;
}

const UserCardFollowingList: React.FC<UserCardProps> = ({
  userData,
  onFollowingDialogueClose,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const navigateToUserProfile = (id: string = userData._id) => {
    navigate("/user-profile", { state: { userId: id } });
  };
  const { addOneConversation } = useUpdateConversation();
  const handleAddNewConversation = (userData: UserCardProps["userData"]) => {
    // export type ParticipantData = {
    //   _id: string;
    //   userName: string;
    //   imageUrl: string;
    //   createdAt: string;
    // };
    const newConversation: ConversationData = {
      _id: `new-convers_${userData._id}`, // This should be generated appropriately
      participantsData: [
        {
          _id: userData._id,
          userName: userData.userName,
          imageUrl: userData.imageUrl,
          createdAt: new Date().toISOString(),
        },
      ],
    };

    console.log('new conversation ',newConversation);
    
    addOneConversation(newConversation);
    handleSelectConversation(userData);
    onFollowingDialogueClose();
  };
  const handleSelectConversation = async (
    userData: UserCardProps["userData"]
  ) =>
    // senderId =  conversation.participantsData[0]._id
    // senderId = conversation.following._id
    {
      dispatch(setChatSelected({ selectedChatUserData: userData }));
      // dispatch(setChatSelected({ selectedChatUserData: conversation.following }));
      // await changeReadStatus(senderId).then(() => {
      //   setUnseenCount(0);
      // });
    };
  return (
    <div className="flex justify-center pb-2">
      <div className="flex items-center bg-white shadow-lg rounded-lg p-4">
        {userData.imageUrl ? (
          <img
            className="w-16 h-16 rounded-full object-cover mr-4 cursor-pointer"
            src={userData.imageUrl}
            alt="User"
            onClick={() => navigateToUserProfile()}
          />
        ) : (
          <FaRegUserCircle
            className="w-16 h-16 mr-4 cursor-pointer"
            onClick={() => navigateToUserProfile()}
          />
        )}
        <div className="max-w-40 min-w-40">
          <div
            className="font-bold text-lg dark:text-black break-words cursor-pointer"
            onClick={() => navigateToUserProfile()}
          >
            {userData.userName}
          </div>
          {userData.firstName && userData.lastName && (
            <div className="font-semibold text-sm dark:text-black break-words">
              {userData.firstName} {userData.lastName}
            </div>
          )}
        </div>
        {/* <Link
          to={myId === userData._id ? "/profile/my-posts" : "/user-profile"}
          state={{ userId: userData._id }}
        > */}
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleAddNewConversation(userData)}
        >
          <BsChatLeftTextFill className="text-white" />
        </Button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default UserCardFollowingList;
