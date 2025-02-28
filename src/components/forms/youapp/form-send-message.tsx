"use client";

import Button from "@/components/ui/button";
import {
  useCreateMessageMutation,
  useUpdateMessageMutation,
} from "@/redux/api/slice/message-api-slice";
import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { VscSend } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Spinner from "@/components/ui/spinner";
import clsx from "clsx";

interface FormSendMessageProps {
  receiverId: string;
  conversationId: string;
  initialMessage?: string;
  messageIdToEdit?: string;
  onCancel?: () => void;
  className?: string;
  formClassName?: string;
}

const FormSendMessage = ({
  receiverId,
  conversationId,
  initialMessage = "",
  messageIdToEdit,
  onCancel,
  className,
  formClassName,
}: FormSendMessageProps) => {
  const [message, setMessage] = useState(initialMessage);
  const [textareaHeight, setTextareaHeight] = useState(45);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();
  const onlineUsers = useSelector((state: RootState) => state.chat.onlineUsers);
  const isReceiverOnline = onlineUsers.includes(receiverId);

  const [createMessage, { isLoading, isSuccess }] = useCreateMessageMutation();
  const [updateMessage, { isLoading: isUpdating }] = useUpdateMessageMutation();

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    const textarea = e.target;
    textarea.style.height = "45px";
    const newHeight = Math.min(textarea.scrollHeight, 64);
    textarea.style.height = `${newHeight}px`;
    setTextareaHeight(newHeight);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    try {
      let result;
      if (messageIdToEdit) {
        result = await updateMessage({
          messageId: messageIdToEdit,
          content: message,
        }).unwrap();
      } else {
        result = await createMessage({
          content: message,
          receiverId,
          conversationId,
        }).unwrap();
      }

      if (result) {
        dispatch({
          type: messageIdToEdit ? "UPDATE_MESSAGE" : "SEND_MESSAGE",
          payload: {
            message: result,
            conversationId,
          },
        });
        setMessage("");
        if (onCancel) onCancel();
      }
    } catch (err) {
      console.error("Gagal mengirim pesan:", err);
    }
  };

  return (
    <div className={`border-t border-t-secondary py-4 ${className}`}>
      {onCancel && (
        <div
          onClick={onCancel}
          className="fixed inset-0 z-10 bg-black/30 backdrop-blur-sm"
        ></div>
      )}

      <form onSubmit={handleSubmit} className={`${formClassName}`}>
        <div className="flex items-center justify-between">
          <div className="relative flex-1">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleTextareaChange}
              style={{
                height: `${textareaHeight}px`,
              }}
              placeholder="Ketik pesan"
              className={clsx(
                "scrollbar-custom max-h-[4rem] w-full resize-none border border-secondary bg-transparent px-4 py-2 outline-none focus:ring-transparent md:max-h-[4rem]",
                textareaHeight >= 64 ? "rounded-2xl" : "rounded-full",
              )}
            />
            {isReceiverOnline && (
              <div className="absolute bottom-1 right-3 text-xs text-green-500">
                Online
              </div>
            )}
          </div>
          <Button
            type="submit"
            disabled={isLoading || isUpdating || !message.trim()}
            className={clsx(
              "max-w-max px-2",
              (isLoading || isUpdating || !message.trim()) &&
                "cursor-not-allowed text-secondary",
            )}
          >
            {isLoading || isUpdating ? (
              <Spinner className="!h-5 !w-5" />
            ) : (
              <VscSend size={28} />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormSendMessage;
