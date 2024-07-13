import React, { useEffect, useRef } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useAppSelector } from "@/utils/hooks/reduxHooks";
import useGetMessage from "@/utils/hooks/chat/useGetMessage";
import { Chat } from "@/types/chat";
import useListenMessages from "@/utils/hooks/chat/useListenMessages";
import PostMessage from "./PostMessage";
import PostReplyMessage from "./PostReplyMessage";
function Messages() {
  const { loading, messages } = useGetMessage();
  useEffect(()=>{
    console.log('messages ',messages);
    
  })

  const lastMessageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  useListenMessages();

  return (
    <div className="flex h-[90vh]  flex-col">
      <div className=" overflow-y-auto min-h-[80vh] p-4 pb-36">
        {/* messages */}
        {messages && messages.length > 0 ? (
          messages.map((message, index) => (
            <div ref={lastMessageRef} key={`${message.recieverId}${index}`}>
            {message.isPostReply ? (
              <PostReplyMessage message={message} />
              // <div>this is reply</div>
            ) : message.isPost ? (
              <PostMessage message={message} />
            ) : (
              <Message message={message} />
            )}
          </div>
          ))
        ) : (
          <>
            <div className="flex items-center">
              no chats send your first message to start conversation
            </div>
          </>
        )}
      </div>
      <MessageInput />
      {loading ? (
        <>
          <div>loading</div>
        </>
      ) : null}
    </div>
  );
}

export default Messages;
