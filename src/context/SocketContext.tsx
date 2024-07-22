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
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
// import { useNotificationContext } from "./NotificationContext";
interface SocketContextType {
  socket: Socket | null;
  onlineUsers: any[];
}
enum NotificationType {
  COMMENT = "comment",
  BID = "bid",
  MESSAGE = "message",
}


interface NotificationData {
  title: string;
  description: string;
  _id: string;
  notificationType: NotificationType;
  messageId: { _id: string };
  senderId: {
    _id: string;
    userName: string;
    imageUrl: string;
  };
  receiverId: string;
  status: string;
  additionalInfo: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
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
        // Handle the list of online users as needed
      });

      newSocket?.on("notification", (data: NotificationData) => {
        console.log(data, "data in notification");

        notificationToast({ data, toast });
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
}: {
  data: NotificationData;
  toast: ReturnType<typeof useToast>["toast"];
}) => {
  let title = "";
  let description = ``;

  switch (data.notificationType) {
    case NotificationType.COMMENT:
      title = "New Comment";
      break;
    case NotificationType.BID:
      title = "New Bid";
      break;
    case NotificationType.MESSAGE:
      title = "New Message";
      description=`From: ${data.senderId.userName}\nMessage: ${data.additionalInfo}`
      break;
    default:
      title = "New Notification";
      break;
  }

  toast({
    title,
    description,
    action: <ToastAction altText="View Notification">View</ToastAction>,
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
