import React from "react";
import { formatDate } from "@/utils/formatDate";
import { Badge } from "@/components/ui/badge";
interface ChatPostSmallProps {
  author: string;
  imageUrl: string;
  description: string;
  createdAt: string;
  isBidding: boolean;
}

const ChatPostSmall: React.FC<ChatPostSmallProps> = ({
  author = "gopakumar",
  imageUrl = "https://res.cloudinary.com/dwjw8biat/image/upload/v1720425955/npoofkkexlvgwwsyui63.svg",
  description = "dslfjdsklfjklsdjflkdsj",
  createdAt,
  isBidding,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md w-64">
      <div className="flex items-center mb-2">
        <img
          src={imageUrl}
          alt="Post Image"
          className="rounded-lg w-16 h-16 object-cover mr-2"
        />
        <div className="flex flex-col">
          {isBidding ? (
            <Badge className="flex justify-center" variant="destructive">
              bid
            </Badge>
          ) : (
            <Badge className="flex justify-center">sell</Badge>
          )}

          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {author}
          </span>
        </div>
      </div>
      <div className="text-sm text-gray-800 dark:text-gray-200">
        {description}
        <div className="flex items-end">
          <span>{formatDate(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatPostSmall;
