import { NormalBackendRes } from "./login";
// {
//     _id: new ObjectId('666092075d83d5cf5b71f485'),
//     following: {
//       userName: 'med_dee_8574',
//       imageUrl: '',
//       createdAt: 2024-06-17T15:05:41.077Z
//     }
//   },
export interface FollowingUser {
  _id: string;
  following: {
    userName: string;
    imageUrl: string;
    createdAt: string;
    _id: string;
  };
}
export interface ConversationsRes extends NormalBackendRes {
  followingUsers: FollowingUser[];
}
export interface Chat {
  senderId: string;
  recieverId: string;
  message: string;
  createdAt: string;
}
export interface IMessage {
  id: number;
  chat:Chat
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
  createdAt: Date;
}

export interface Conversation {
  _id: string;
  following: Following;
}