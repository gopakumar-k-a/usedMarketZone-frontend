export const END_POINTS = {
  //auth
  SEND_OTP_SIGNUP: "/api/auth/send-otp",
  RESEND_OTP: "/api/auth/resend-otp",
  VERFY_OTP_SIGNUP: "/api/auth/verify-sign-up",
  USER_LOG_IN: "/api/auth/login",
  GOOGLE_LOG_IN: "/api/auth/google-login",
  FORGOT_PASSWORD: "api/auth/forgot-password",
  VERIFY_OTP_FORGOT_PASS: "api/auth/verfiy-forgot-password",
  RESET_PASSWORD: "/api/auth/reset-password",
  //user
  GET_USER_INFO: "/api/user/profile",
  USER_NAME_AVILABILITY: "/api/user/username-check",
  UPDATE_PROFILE: "/api/user/edit-profile",
  UPDATE_PROFILE_PIC: "/api/user/edit-profile/update-image",
  UPDATE_USER_PASSWORD: "/api/user/edit-profile/update-password",
  REMOVE_PROFILE_PIC: "/api/user/edit-profile/remove-profile-pic",
  GET_SUGGESTED_USERS: "/api/user/suggested-users",
  FOLLOW_USER: "/api/user/follow-user",
  UN_FOLLOW_USER: "/api/user/un-follow-user",
  GET_NO_OF_FOLLOW: "/api/user/num-of-follow",
  GET_FOLLOWERS: "/api/user/followers",
  GET_FOLLOWING: "/api/user/following",
  //chat
  SEND_MESSAGE: "/api/message/send-message",
  SEND_POST_AS_MESSAGE:"/api/message/send-post",
  SEND_POST_REPLY_AS_MESSAGE:"/api/message/reply-post",
  GET_CHAT: "/api/message/get-chat",
  //product

  POST_PRODUCT: "/api/product/post-product",
  GET_ALL_POSTS: "/api/product/get-all-products-posts",
  BOOKMARK_POST: "/api/product/bookmark-post",
  REPORT_POST: "/api/product/report-post",
  GET_OWNER_POSTS_IMAGE_LIST: "/api/product/owner/get-image-list",
  GET_POST_DETAILS: "/api/product/get-post-details",
  ADD_NEW_COMMENT: "/api/product/add-comment",
  REPLY_COMMENT: "/api/product/reply-comment",
  GET_POST_COMMENTS: "/api/product/get-post-comments",
  GET_REPLY_COMMENTS: "/api/product/get-comment-reply",
  DELETE_COMMENT: "/api/product/delete-comment",
  GET_BOOKMARK_IMAGE_LIST:"/api/product/owner/get-bookmark-list",

  //bid
  POST_BID_PRODUCT: "/api/bid/post-bid",

  //admin

  GET_ALL_USERS: "/api/admin/get-all-users",
  UPDATE_USER_ACCESS: "/api/admin/block-user",
  GET_USER_PROFILE_IN_ADMIN: "/api/admin/get-user-profile",
  GET_USER_POSTS_IN_ADMIN: "/api/admin/get-user-posts",
  GET_USER_POST_DETAILS_IN_ADMIN: "/api/admin/get-user-post-details",
  GET_BID_REQUESTS: "/api/admin/get-bid-requests",
  ACCEPT_BID_PRODUCT: "/api/admin/accept-bid",
  GET_POST_REPORTS: "/api/admin/get-post-reports",
  BLOCK_USER_POST:"/api/admin/block-post"
};
