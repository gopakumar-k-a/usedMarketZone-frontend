import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { useAppSelector } from "@/utils/hooks/reduxHooks";
import io, { Socket } from "socket.io-client";
import { Constants } from "@/constants/config";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import useNotifications from "@/utils/hooks/userNotification/useNofication";
import { Notification } from "@/types/Notification";
import { NotificationType } from "@/types/Notification";
// import { useNotificationContext } from "./NotificationContext";
interface SocketContextType {
  socket: Socket | null;
  onlineUsers: any[];
}




const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketContextProviderProps {
  children: ReactNode;
}

export const SocketContextProvider = ({
  children,
}: SocketContextProviderProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const { toast } = useToast();
  const { addOneNotification } = useNotifications();
  useEffect(() => {
    console.log("SocketContextProvider mounted");
    if (user) {
      console.log("User is logged in, connecting to socket");
      const newSocket = io(Constants.BASE_URL, {
        query: {
          userId: user._id,
        },
      });
      setSocket(newSocket);
      newSocket?.on("getOnlineUsers", (onlineUsers: string[]) => {
        console.log("Online users received:", onlineUsers);
        setOnlineUsers(onlineUsers);
      });

      newSocket?.on("notification", (data: Notification) => {
        console.log(data, "data in notification");

        notificationToast({ data, toast, addOneNotification });
      });

      return () => {
        console.log("Cleaning up socket connection");
        newSocket.close();
      };
    } else {
      console.log("User is not logged in, closing socket if exists");
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  console.log("Rendering SocketContextProvider", { socket, onlineUsers });

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

// const notificationToast = ({
//   data,
//   toast,
// }: {
//   data: { title: string; description: string };
//   toast: ReturnType<typeof useToast>['toast'];
// }) => {
//   toast({
//     title: data.title,
//     description: data.description,
//     action: (
//       <ToastAction altText="Goto schedule to undo">Mark As Read</ToastAction>
//     ),
//   });
// };
const notificationToast = ({
  data,
  toast,
  addOneNotification,
}: {
  data: Notification;
  toast: ReturnType<typeof useToast>["toast"];
  addOneNotification: any;
}) => {
  let title = "";
  let description = ``;
  console.log("notificationType:", data.notificationType);
  console.log("data in toast ", data);
  console.log("data.newNotification", data.newNotification);

  if (data.newNotification) {
    console.log(" got notification");

    addOneNotification(data.newNotification);
  } else {
    console.log("No newNotification in data");
  }

  switch (data.notificationType) {
    case NotificationType.COMMENT:
      title = "New Comment";
      break;
    case NotificationType.OUTBID:
      title = "OutBid";
      break;
    case NotificationType.BIDLOSE:
      title = "bid Lose";
      break;
    case NotificationType.BIDWIN:
      title = "Bid Won";
      break;

    case NotificationType.MESSAGE:
      title = "New Message";
      description = `From: ${data.senderId.userName}\nMessage: ${data.additionalInfo}`;
      break;
    case NotificationType.FOLLOW:
      title = "new follower";
      description = `${data.description}`;
      break;
    default:
      console.log("data ", data);
      title = "New Notification";
      break;
  }

  toast({
    title,
    description,
    action: <ToastAction altText="clear Notification">clear</ToastAction>,
  });
  // switch (data.notificationType) {
  //   case NotificationType.COMMENT:
  //     toast({
  //       title: "New Comment",
  //       description: data.description,
  //       action: <ToastAction altText="View Comment">View</ToastAction>,
  //     });
  //     break;

  //   case NotificationType.BID:
  //     toast({
  //       title: "New Bid",
  //       description: data.description,
  //       action: <ToastAction altText="View Bid">View</ToastAction>,
  //     });
  //     break;

  //   case NotificationType.MESSAGE:
  //     toast({
  //       title: "New Message",
  //       description: data.description,
  //       action: <ToastAction altText="View Message">View</ToastAction>,
  //     });
  //     break;

  //   default:
  //     toast({
  //       title: data.title,
  //       description: data.description,
  //       action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
  //     });
  //     break;
  // }
};
// export const useSocketContext = () => {
//   return useContext(SocketContext);
// };

export const useSocketContext = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};
