import { useGetMessageQuery } from "@/redux/api/slice/message-api-slice";
import ChatBadge from "./chat-badge";
import { formatTime } from "@/utils/format-date";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setMessages } from "@/redux/features/chat-slice";
import { MessageTypes } from "@/types/index.types";
import ChatDihapus from "@/components/globals/chat-dihapus";
import Spinner from "@/components/ui/spinner";

interface ChatBodyProps {
  receiverId: string;
  conversationId?: string;
}

const ChatBody = ({ receiverId, conversationId }: ChatBodyProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const { data: initialMessages, isLoading } = useGetMessageQuery(receiverId);

  const reduxMessages = useSelector((state: RootState) =>
    conversationId ? state.chat?.messages?.[conversationId] : undefined,
  );

  const messages = useMemo(
    () => reduxMessages || initialMessages || [],
    [reduxMessages, initialMessages],
  );

  const isTyping = useSelector((state: RootState) =>
    conversationId ? state.chat?.isTyping?.[conversationId] : false,
  );

  useEffect(() => {
    dispatch({ type: "INITIALIZE_SOCKET" });

    const timer = setTimeout(() => {
      if (conversationId) {
        dispatch({ type: "JOIN_CONVERSATION", payload: conversationId });
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      if (conversationId) {
        dispatch({ type: "LEAVE_CONVERSATION", payload: conversationId });
      }
    };
  }, [conversationId, dispatch]);

  useEffect(() => {
    if (initialMessages && conversationId) {
      dispatch(
        setMessages({
          conversationId,
          messages: initialMessages,
        }),
      );
    }
  }, [initialMessages, conversationId, dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <Spinner /> Loading...
      </div>
    );
  }

  return (
    <div className="scrollbar-custom my-2 h-screen w-full overflow-y-scroll">
      <div className="mb-4 rounded-lg bg-dark p-4 text-center text-sm text-yellow-200">
        Pesan yang di kirim ke chat ini dan panggilan kini diamankan dengan
        enkripsi end-to-end. Ketuk untuk info selanjutnya.
      </div>

      {messages.map((message: MessageTypes) => (
        <ChatBadge
          key={message._id || message.id}
          messageId={message._id || message.id}
          receiverId={receiverId}
          conversationId={conversationId}
          type={message.senderId === receiverId ? "LEFT" : "RIGHT"}
          deleted={message.deleted}
          content={message.deleted ? <ChatDihapus /> : message.content}
          time={formatTime(message.createdAt)}
        />
      ))}

      {isTyping && (
        <ChatBadge
          type="LEFT"
          receiverId={receiverId}
          conversationId={conversationId}
          content={
            <div className="flex gap-1">
              <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500"></div>
              <div
                className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          }
          time=""
        />
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatBody;
