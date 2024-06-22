export const END_POINTS = {
    //auth
    SEND_OTP_SIGNUP: '/api/auth/send-otp',
    RESEND_OTP:'/api/auth/resend-otp',
    VERFY_OTP_SIGNUP:'/api/auth/verify-sign-up',
    USER_LOG_IN:'/api/auth/login',
    GOOGLE_LOG_IN:'/api/auth/google-login',
    FORGOT_PASSWORD:'api/auth/forgot-password',
    VERIFY_OTP_FORGOT_PASS:'api/auth/verfiy-forgot-password',
    RESET_PASSWORD:'/api/auth/reset-password',
    //user
    GET_USER_INFO:'/api/user/profile',
    USER_NAME_AVILABILITY:'/api/user/username-check',
    UPDATE_PROFILE:'/api/user/edit-profile',
    UPDATE_PROFILE_PIC:'/api/user/edit-profile/update-image',
    UPDATE_USER_PASSWORD:'/api/user/edit-profile/update-password',
    REMOVE_PROFILE_PIC:'/api/user/edit-profile/remove-profile-pic',
    //product

    POST_PRODUCT:'/api/product/post-product',
    GET_ALL_POSTS:'/api/product/get-all-products-posts',

    //admin

    GET_ALL_USERS:'/api/admin/get-all-users',
    UPDATE_USER_ACCESS:'/api/admin/block-user'



}

