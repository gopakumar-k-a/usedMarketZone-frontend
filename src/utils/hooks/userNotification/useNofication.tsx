import {
  setNotification,
  addNewNotification,
  changeUnreadNotificationStatus,
} from "@/redux/reducers/user/userNotification/userNotificationSlice";
import { Notification } from "@/types/Notification";
import { useAppDispatch } from "../reduxHooks";
import { useAppSelector } from "../reduxHooks";

const useNotifications = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(
    (state) => state.userNotifications.userNotifications
  );
  const isUnreadNotifications = useAppSelector(
    (state) => state.userNotifications.isUnreadNotifications
  );
  const setNotifications = (newNotifications: Notification[]) => {
    dispatch(setNotification({ userNotifications: newNotifications }));
  };

  const addOneNotification = (newNotification: Notification) => {
    dispatch(addNewNotification({ userNotification: newNotification }));
  };

  const markNotificationsRead = () => {
    dispatch(changeUnreadNotificationStatus());
  };

  return {
    notifications,
    setNotifications,
    addOneNotification,
    isUnreadNotifications,
    markNotificationsRead,
  };
};

export default useNotifications;
