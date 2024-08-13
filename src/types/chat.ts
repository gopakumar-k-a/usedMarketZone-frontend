import { NormalBackendRes } from "./login";
// {
//     _id: new ObjectId('666092075d83d5cf5b71f485'),
//     following: {
//       userName: 'med_dee_8574',
//       imageUrl: '',
//       createdAt: 2024-06-17T15:05:41.077Z
//     }
//   },

export interface FollowUser {
  userName: string;
  imageUrl: string;
  createdAt: string;
  _id: string;
  firstName: string;
  lastName: string;
}
export interface FollowingUser {
  _id: string;
  following: FollowUser;
}
export interface ConversationsRes extends NormalBackendRes {
  followingUsers: FollowingUser[];
}

export interface FollowerUsers {
  followers: FollowUser;
}

export interface FollowUserRes extends NormalBackendRes {
  followerUsers: FollowerUsers[];
}
export interface Chat {
  senderId: string;
  recieverId: string;
  message: string;
  createdAt: string;
  isPost: boolean;
  isPostReply: boolean;
  postId: string;
  postImageUrl: string[];
  postDescription: string;
  postIsBidding: boolean;
  postOwnerId: string;
  postOwnerUserName: string;
  postCreatedAt: string;
}
export interface IMessage {
  id: number;
  chat: Chat;
}

export interface SendMessageRes extends NormalBackendRes {
  newMessage: IMessage;
}

export interface GetChatRes extends NormalBackendRes {
  chats: Chat[];
}

export interface Following {
  _id: string;
  userName: string;
  imageUrl: string;
  createdAt: string;
}

export type ParticipantData = {
  _id: string;
  userName: string;
  imageUrl: string;
  createdAt: string;
};
export interface ConversationData {
  _id: string;
  participantsData: ParticipantData[];
}
export interface GetConversationsRes extends NormalBackendRes {
  conversations: ConversationData[];
}
