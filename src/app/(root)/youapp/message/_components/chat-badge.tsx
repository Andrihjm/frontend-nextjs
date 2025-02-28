"use client";

import { useState } from "react";
import ChatAttachment from "./chat-attachment";
import FormSendMessage from "@/components/forms/youapp/form-send-message";
import Spinner from "@/components/ui/spinner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import clsx from "clsx";

interface ChatBadgeProps {
  type: "RIGHT" | "LEFT";
  content: any;
  time: string;
  messageId?: any;
  receiverId: any;
  conversationId: any;
  onEdit?: () => void;
  deleted?: boolean;
}

const ChatBadge = ({
  type,
  content,
  time,
  messageId,
  receiverId,
  conversationId,
  onEdit,
  deleted,
}: ChatBadgeProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="group">
      <div
        className={clsx(
          "flex",
          type === "RIGHT" && isEditing && "ml-auto flex-col",
        )}
      >
        <div
          className={clsx(
            `relative mt-1 flex w-max max-w-[85%] flex-wrap items-end gap-2 rounded-2xl px-4 py-2`,
            type === "RIGHT" ? "ml-auto bg-white-opacity" : "bg-dark/50",
            isEditing && "z-20",
          )}
        >
          <span className="overflow-wrap-anywhere break-all">{content}</span>
          <span
            className={clsx(
              "ml-auto flex h-1 items-end justify-end text-xs",
              deleted && "text-secondary",
            )}
          >
            {time}
          </span>

          <div
            className={clsx(
              "absolute -left-[60px] top-0",
              isEditing && "hidden",
            )}
          >
            {type === "RIGHT" && deleted === false && (
              <ChatAttachment
                messageId={messageId}
                content={content}
                receiverId={receiverId}
                conversationId={conversationId}
                onEdit={handleUpdate}
              />
            )}
          </div>
        </div>

        {isEditing && (
          <div className="mt-2">
            <FormSendMessage
              receiverId={receiverId}
              conversationId={conversationId}
              initialMessage={content}
              messageIdToEdit={messageId}
              onCancel={handleCancelEdit}
              className="border-none py-0"
              formClassName="relative z-50"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBadge;
