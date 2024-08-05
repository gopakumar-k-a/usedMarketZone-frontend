import { NormalBackendRes } from "./login";

export enum NotificationType {
  COMMENT = "comment",
  OUTBID = "outBid",
  BIDWIN = "bidWin",
  BIDLOSE = "bidLose",
  MESSAGE = "message",
  FOLLOW = "follow",
}

export interface Notification {
  _id: string;
  notificationType: NotificationType;
  messageId: {
    _id: string;
    message: string;
  };
  senderId: {
    _id: string;
    userName: string;
    imageUrl: string;
  };
  postId?: {
    _id: string;
    productImageUrls: string[];
    productName:string;
  };
  receiverId: string;
  status: string;
  additionalInfo: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  newNotification: Notification;
  description: string;
}

export interface NotificationRes extends NormalBackendRes {
  userNotifications: Notification[];
}
