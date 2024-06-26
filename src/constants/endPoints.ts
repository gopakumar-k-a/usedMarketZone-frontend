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
  //product

  POST_PRODUCT: "/api/product/post-product",
  GET_ALL_POSTS: "/api/product/get-all-products-posts",
  BOOKMARK_POST: "/api/product/bookmark-post",
  REPORT_POST: "/api/product/report-post",
  GET_OWNER_POSTS_IMAGE_LIST: "/api/product/owner/get-image-list",
  GET_POST_DETAILS: "/api/product/get-post-details",
  ADD_NEW_COMMENT:"/api/product/add-comment",
  REPLY_COMMENT:"/api/product/reply-comment",
  GET_POST_COMMENTS:"/api/product/get-post-comments",
  GET_REPLY_COMMENTS:"/api/product/get-comment-reply",

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
};
