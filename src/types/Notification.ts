

export enum NotificationType {
  COMMENT = "comment",
  BID = "bid",
  MESSAGE = "message",
}

export interface Notification {
  _id: string;
  notificationType: NotificationType;
  messageId: {
    _id: string;
    messages: string;
  };
  senderId: {
    _id: string;
    userName: string;
    imageUrl: string;
  };
  postId?: {
    _id: string;
    productImageUrls: string[];
  };
  receiverId: string;
  status: string;
  additionalInfo: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
