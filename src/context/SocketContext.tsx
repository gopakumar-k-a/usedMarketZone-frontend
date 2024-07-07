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
        setOnlineUsers(onlineUsers)
        // Handle the list of online users as needed
      });

    //   socket?.on("getOnlineUsers", (users: any[]) => {
    //     setOnlineUsers(users);
    //   });
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
export const useSocketContext = () => {
    return useContext(SocketContext);
  };
  
