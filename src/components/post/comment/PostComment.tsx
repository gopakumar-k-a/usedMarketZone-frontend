import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { addNewComment } from "@/api/product";

function PostComment() {
  

  const [newComment, setNewComment] = useState("");

  const handlePostComment = async() => {
    console.log('comment submitting ',newComment);
     // content:string,
      // authorId:string,
      // postId:string,
      // parentCommentId:string|null=null
 


    // setComments([
    //   ...comments,
    //   {
    //     userImage: "https://avatars.githubusercontent.com/u/22263436?v=4",
    //     userName: "New User",
    //     userLevel: "Level 1",
    //     commentText: newComment,
    //     replies: [],
    //   },
    // ]);
    // setNewComment("");
  };
  return (
    <>
      <div className="w-3/4 mx-auto ">
        <div className="border-t-2  border-gray-200 bg-gray-100 px-4 pt-4 mb-2 sm:mb-0 rounded-lg">
          <div className="relative flex">
            <span className="absolute inset-y-0 flex items-center"></span>
            {/* <textarea
      
            placeholder="add your comment"
            className=""
          /> */}
            <textarea
            onChange={(e)=>setNewComment(e.target.value)}
              placeholder="add your comment"
              className="resize-none rounded-md w-3/4 focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-2 bg-gray-200 py-3"
            ></textarea>

            <div className="absolute right-0 items-center inset-y-0  sm:flex">
              <Button
                onClick={handlePostComment}
                disabled={!newComment}
                type="button"
                className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 ml-2 transform rotate-90"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostComment;
