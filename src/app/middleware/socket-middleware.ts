import { Middleware } from "redux";
import { io, Socket } from "socket.io-client";
import {
  addMessage,
  setOnlineUsers,
  addOnlineUser,
  removeOnlineUser,
  setTypingStatus,
} from "@/redux/features/chat-slice";

let socket: Socket | null = null;

const initializeSocket = (auth: any) => {
  if (!socket && auth && auth.token) {
    try {
      socket = io(
        process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001",
        {
          withCredentials: true,
          auth: {
            token: auth.token,
          },
        },
      );
      return socket;
    } catch (error) {
      console.error("Error initializing socket:", error);
      return null;
    }
  }
  return socket;
};

const socketMiddleware: Middleware = (store) => {
  return (next) => (action: any) => {
    const { dispatch, getState } = store;
    const { auth } = getState();

    if (
      action.type === "auth/loginSuccess" ||
      action.type === "INITIALIZE_SOCKET"
    ) {
      if (!socket && auth && auth.token) {
        socket = initializeSocket(auth);

        if (socket) {
          socket.on("connect", () => {
            console.log("Socket terhubung");
            if (auth?.user?.id) {
              socket?.emit("user_online", { userId: auth.user.id });
            }
          });

          socket.on("disconnect", () => {
            console.log("Socket terputus");
          });

          socket.on("receive_message", (data) => {
            dispatch(addMessage(data.message));
          });

          socket.on("online_users", (data) => {
            dispatch(setOnlineUsers(data.users));
          });

          socket.on("user_online", (data) => {
            dispatch(addOnlineUser(data.userId));
          });

          socket.on("user_offline", (data) => {
            dispatch(removeOnlineUser(data.userId));
          });

          socket.on("typing_status", (data) => {
            dispatch(
              setTypingStatus({
                conversationId: data.conversationId,
                isTyping: data.isTyping,
              }),
            );
          });
        }
      }
    }

    if (action.type === "auth/logout") {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    }

    if (socket) {
      if (action.type === "SEND_MESSAGE") {
        const { message, conversationId } = action.payload;
        socket.emit("new_message", { message, conversationId });
      }

      if (action.type === "JOIN_CONVERSATION") {
        socket.emit("join_conversation", { conversationId: action.payload });
      }

      if (action.type === "LEAVE_CONVERSATION") {
        socket.emit("leave_conversation", { conversationId: action.payload });
      }

      if (action.type === "TYPING_STATUS") {
        const { conversationId, isTyping } = action.payload;
        socket.emit("typing_status", { conversationId, isTyping });
      }
    }

    return next(action);
  };
};

export default socketMiddleware;
