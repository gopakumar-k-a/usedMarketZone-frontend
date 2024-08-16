import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import {
  addNewComment,
  deletComment,
  getReplyComments,
  replyComment,
} from "@/api/product";
import { store } from "@/redux/app/store";
import { getPostComments } from "@/api/product";
import { RxCross2 } from "react-icons/rx";
import { formatDate } from "@/utils/formatDate";
import { MdDeleteOutline } from "react-icons/md";
import LoadingButton from "@/components/loadingButton/LoadingButton";
const Discussion = ({ pId }: { pId: string }) => {
  const commentStart = useRef<HTMLDivElement | null>(null);
  const replyInputRef = useRef<HTMLTextAreaElement | null>(null);

  // const replyUserRef = useRef<HTMLDivElement | null>(null);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setLoading] = useState(false);
  //   {
  //     "_id": "6681780ec32558479cfe75a4",
  //     "content": "comment test 1",
  //     "authorId": "666092075d83d5cf5b71f485",
  //     "replies": [],
  //     "imageUrl": "https://res.cloudinary.com/dwjw8biat/image/upload/v1719044266/ln1r91tabpuuafwfgeiv.jpg",
  //     "userName": "gopa_kumar"
  // }
  interface Comment {
    _id: string;
    content: string;
    authorId: string;
    replies: string[];
    imageUrl: string;
    userName: string;
    createdAt: string;
    parentCommentId: string;
  }
  const commentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [comments, setComments] = useState<Comment[]>([]);
  const [replies, setReplies] = useState<Comment[]>([]);

  const [isCommentReplyDivOpen, setCommentReplyDivOpen] = useState(false);
  const [mainCommentUserName, setMainCommentUserName] = useState("");
  const [commentReply, setCommentReply] = useState("");
  const [parentCommentId, setParentCommentId] = useState("");
  const [activeParentCommentId, setActiveParentCommentId] = useState("");
  const [newReplyCommentId, setNewReplyCommentId] = useState<string | null>("");
  const userId = store.getState().auth.user?._id;

  useEffect(() => {
    console.log("pId ", pId);
  }, []);
  useEffect(() => {
    if (newReplyCommentId && commentRefs.current[newReplyCommentId]) {
      commentRefs.current[newReplyCommentId]?.scrollIntoView({
        behavior: "smooth",
      });
      setNewReplyCommentId(null);
    }
  }, [newReplyCommentId]);

  useEffect(() => {
    if (isCommentReplyDivOpen && replyInputRef.current) {
      replyInputRef.current.focus();
    }
  }, [isCommentReplyDivOpen]);

  useEffect(() => {
    const fetchPostComments = async () => {
      try {
        const { commentData } = await getPostComments(pId);
        //   {
        //     "_id": "6681780ec32558479cfe75a4",
        //     "content": "comment test 1",
        //     "authorId": "666092075d83d5cf5b71f485",
        //     "replies": [],
        //     "imageUrl": "https://res.cloudinary.com/dwjw8biat/image/upload/v1719044266/ln1r91tabpuuafwfgeiv.jpg",
        //     "userName": "gopa_kumar"
        // }
        console.log("commentData ", commentData);
        setComments(commentData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPostComments();
    // const commentData = fetchPostComments();
  }, []);

  const handlePostComment = async () => {
    // console.log('post id ',postId);
    const trimmedComment = newComment.trim();
    if (trimmedComment.length === 0) {
      return;
    }
    console.log("post id ", pId);

    console.log("comment submitting ", newComment);
    // content:string,
    // authorId:string,
    // postId:string,
    // parentCommentId:string|null=null

    const newCommentData = {
      content: newComment,
      authorId: userId,
      postId: pId,
    };

    console.log("new comment data ", newCommentData);
    setLoading(true);

    try {
      const response = await addNewComment(newCommentData);
      console.log(response.newCommentData[0]);
      setComments([response.newCommentData[0], ...comments]);
    } catch (error) {
      console.log(error);
    }
    setNewComment("");
    setLoading(false);

    if (commentStart.current) {
      commentStart.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCommentReplyOff = () => {
    setCommentReplyDivOpen(!isCommentReplyDivOpen);
  };

  const onClickReply = (commentId: string, commentUserName: string) => {
    setCommentReplyDivOpen(true);
    setMainCommentUserName(commentUserName);
    setParentCommentId(commentId);
  };
  const fetchReplyComments = async (parentCommentId: string) => {
    try {
      const response = await getReplyComments(parentCommentId);
      console.log("getReplyComments response", response);
      setActiveParentCommentId(parentCommentId);
      setReplies(response.replyData);
    } catch (error) {}
  };
  const submitReplyToComment = async () => {
    const newReplyCommentData = {
      content: commentReply,
      authorId: userId,
      postId: pId,
      parentCommentId,
    };
    console.log(
      "submitReplyToComment newReplyCommentData",
      newReplyCommentData
    );

    try {
      const response = await replyComment(newReplyCommentData);
      console.log(response.newCommentData);

      comments.forEach((comment) =>
        comment._id == parentCommentId
          ? comment.replies.push(response.newCommentData[0]._id)
          : comment
      );
      fetchReplyComments(parentCommentId);
      setNewReplyCommentId(parentCommentId);
      handleCommentReplyOff();
    } catch (error) {
      console.log(error);
    }
    setCommentReply("");
    setLoading(false);
  };

  const handleDeleteComment = async (
    commentId: string,
    parentCommentId: string | null = null
  ) => {
    const payload = {
      commentId,
      parentCommentId,
    };

    try {
      await deletComment(payload);
      // if (commentId) {

      // }

      if (commentId && parentCommentId) {
        console.log("inside child commment delete");

        const updatedReplies = replies.filter((reply) =>
          reply._id == commentId ? null : reply
        );
        setReplies(updatedReplies);
        // const updatedComments = comments.filter((comment) => {
        //   // (comment._id==parentCommentId)?(comment.replies):(comment)
        //   if (comment._id == parentCommentId) {
        //     const replyIndex = comments.findIndex(
        //       (comment, index) => comment._id === parentCommentId
        //     );

        //     console.log('reply index ',replyIndex);

        //     if (replyIndex !== -1) {
        //       // The comment with the specified ID was found
        //       comment.replies.splice(replyIndex, 1);
        //       console.log("Parent comment found at index:", replyIndex);
        //     } else {
        //       // No comment with the specified ID was found
        //       console.log("Parent comment not found");
        //     }
        //     return comment;
        //   } else {
        //     return comment;
        //   }
        // });
        // setComments(updatedComments);
      }
      if (commentId && !parentCommentId) {
        console.log("inside parent comment delete");

        const updatedComments = comments.filter((comment) =>
          comment._id == commentId ? null : comment
        );

        setComments(updatedComments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" h-screen w-full ">
        <div className="h-3/4 ">
          <div
            className="w-full h-full bg-white rounded-lg border p-1 md:p-3  sm:h-full overflow-y-scroll "
            ref={commentStart}
          >
            <h3 className="font-semibold p-1">comments </h3>
            <div className="flex flex-col gap-5 m-3 pb-20 sm:pb-0">
              {comments.map((comment, index) => (
                <div
                  key={index}
                  ref={(el) => (commentRefs.current[comment._id] = el)}
                >
                  <div className="flex w-full justify-between border rounded-md">
                    <div className="p-3">
                      <div className="flex gap-3 items-center">
                        <img
                          src={comment.imageUrl}
                          className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400 shadow-emerald-400"
                          alt="user avatar"
                        />
                        <h3 className="font-bold">
                          {comment.userName}
                          <br />
                        </h3>
                        <h4>{formatDate(comment.createdAt)}</h4>
                        {/* <h4
                          className="cursor-pointer"
                          onClick={() => handleDeleteComment(comment._id)}
                        >
                          delete
                        </h4> */}
                        <MdDeleteOutline
                          onClick={() => handleDeleteComment(comment._id)}
                          className="cursor-pointer  bg-red-600 hover:bg-red-500 h-5 w-5 rounded-lg text-white"
                        />
                      </div>
                      <p className="text-gray-600 mt-2">{comment.content}</p>
                      <button
                        className="text-right text-blue-500"
                        onClick={() =>
                          onClickReply(comment._id, comment.userName)
                        }
                      >
                        Reply
                      </button>
                    </div>
                  </div>

                  {comment.replies.length > 0 && (
                    <>
                      {activeParentCommentId == comment._id ? (
                        <div
                          className="cursor-pointer"
                          onClick={() => setActiveParentCommentId("")}
                        >
                          -hide replies
                        </div>
                      ) : (
                        <div
                          className="cursor-pointer"
                          onClick={() => fetchReplyComments(comment._id)}
                        >
                          {comment.replies.length} replies -show replies{" "}
                        </div>
                      )}
                    </>
                  )}

                  {activeParentCommentId == comment._id &&
                    replies.map((reply, replyIndex) => (
                      <React.Fragment key={replyIndex}>
                        <div className="text-gray-300 font-bold pl-14">|</div>
                        <div className="flex justify-between border ml-5 rounded-md    ">
                          <div className="p-3">
                            <div className="flex gap-3 items-center">
                              <img
                                src={reply.imageUrl}
                                className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400 shadow-emerald-400"
                                alt="user avatar"
                              />
                              <h3 className="font-bold">
                                {reply.userName}
                                <br />
                              </h3>
                              <h4>{formatDate(reply.createdAt)}</h4>

                              <MdDeleteOutline
                                onClick={() =>
                                  handleDeleteComment(reply._id, comment._id)
                                }
                                className="cursor-pointer  bg-red-600 hover:bg-red-500 h-5 w-5 rounded-lg text-white"
                              />
                            </div>
                            <p className="text-gray-600 mt-2">
                              {reply.content}
                            </p>
                          </div>
                          <div className="flex flex-col gap-3 pr-3 py-3"></div>
                        </div>
                      </React.Fragment>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-1/4 flex items-start flex-col">
          {isCommentReplyDivOpen && (
            <div
              className={` w-full h-1/3 z-10 bg-gray-200 border-t-2 border-gray-400 rounded-t-lg 

                   shadow transition duration-500 ease-in-out
  ${isCommentReplyDivOpen ? "transform translate-y-0" : "transform-translate-y-full"}
                    `}
            >
              <div className="grid grid-cols-4">
                <div className="col-span-3 flex items-center pl-2 pt-2 justify-start">
                  reply to... @{mainCommentUserName}
                </div>
                <div className="col-span-1 flex items-top pr-2 pt-2 justify-end">
                  <RxCross2
                    className="font-bold"
                    onClick={() => handleCommentReplyOff()}
                  />
                </div>
              </div>
            </div>
          )}

          <div className={`flex items-end h-full w-full `}>
            <div className="w-full sm:sticky fixed sm:bottom-0 bottom-12 left-0  mx-auto self-end">
              <div className="border-t-2  border-gray-200 bg-gray-100 px-4 pt-4 mb-2 sm:mb-0 rounded-lg">
                {isCommentReplyDivOpen ? (
                  // reply comment
                  <div className="relative flex">
                    <span className="absolute inset-y-0 flex items-center"></span>

                    <textarea
                      ref={replyInputRef}
                      value={commentReply}
                      onChange={(e) => setCommentReply(e.target.value)}
                      placeholder={`reply to... @${mainCommentUserName}`}
                      className="resize-none rounded-md w-3/4 focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-2 bg-gray-200 py-3"
                    ></textarea>

                    <div className="absolute right-0 items-center inset-y-0  sm:flex">
                      <Button
                        onClick={submitReplyToComment}
                        disabled={!commentReply}
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
                ) : (
                  // add new comment
                  <div className="relative flex">
                    <span className="absolute inset-y-0 flex items-center"></span>

                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="add your comment"
                      className="resize-none rounded-md w-3/4 focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-2 bg-gray-200 py-3"
                    ></textarea>

                    <div className="absolute right-0 items-center inset-y-0  sm:flex">
                      <Button
                        onClick={handlePostComment}
                        disabled={!newComment}
                        type="button"
                        className={`inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white  focus:outline-none ${!isLoading && "bg-blue-500 hover:bg-blue-400"}`}
                      >
                        {isLoading ? (
                          <LoadingButton buttonText="" />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-6 w-6 ml-2 transform rotate-90"
                          >
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                          </svg>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Discussion;
