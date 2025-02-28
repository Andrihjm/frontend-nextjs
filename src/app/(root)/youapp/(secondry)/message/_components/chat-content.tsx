"use client";

import FormSendMessage from "@/components/forms/youapp/form-send-message";
import ChatBody from "./chat-body";
import ChatHeader from "./chat-header";

interface ChatContentProps {
  receiverId: string;
}

const ChatContent = ({ receiverId }: ChatContentProps) => {
  return (
    <div className="flex h-screen w-full flex-col overflow-y-hidden">
      <ChatHeader />
      <ChatBody receiverId={receiverId} conversationId={receiverId} />
      <FormSendMessage receiverId={receiverId} conversationId={receiverId} />
    </div>
  );
};

export default ChatContent;
