import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "@/types/Notification";

interface NotificationState {
  userNotifications: Notification[];
  isUnreadNotifications: boolean;
}

const initialState: NotificationState = {
  userNotifications: [],
  isUnreadNotifications: false,
};

const userNotificationSlice = createSlice({
  name: "userNotification",
  initialState,
  reducers: {
    setNotification: (
      state,
      action: PayloadAction<{ userNotifications: Notification[] }>
    ) => {
      state.userNotifications = [...action.payload.userNotifications];

      state.isUnreadNotifications = action.payload.userNotifications.some(
        (notification) => notification.status === "unread"
      );
      // const unreadNotificationCheck = action.payload.userNotifications.find(
      //   (notification) => notification.status == "unread"
      // );
      // unreadNotificationCheck
      //   ? (state.isUnreadNotifications = true)
      //   : (state.isUnreadNotifications = false);
    },
    addNewNotification: (
      state,
      action: PayloadAction<{ userNotification: Notification }>
    ) => {

      state.userNotifications = [
        action.payload.userNotification,
        ...state.userNotifications,
      ];
      if (action.payload.userNotification.status == "unread") {
        state.isUnreadNotifications = true;
      }
    },
    changeUnreadNotificationStatus: (state) => {
      state.isUnreadNotifications = !state.isUnreadNotifications;
    },
  },
});

export const { setNotification, addNewNotification,changeUnreadNotificationStatus } =
  userNotificationSlice.actions;
export default userNotificationSlice.reducer;
