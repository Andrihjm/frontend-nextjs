"use client";

import Button from "@/components/ui/button";
import { useDeleteMessageMutation } from "@/redux/api/slice/message-api-slice";
import { setEditing } from "@/redux/features/message-feature-slice";
import { FaTrash } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";

interface ChatAttachmentProps {
  messageId: string;
  content: string;
  receiverId: string;
  conversationId: string;
  onEdit: () => void;
  className?: string;
}

const ChatAttachment = ({
  messageId,
  content,
  receiverId,
  conversationId,
  onEdit,
  className,
}: ChatAttachmentProps) => {
  const [deleteMessage, { isLoading: isDeleting }] = useDeleteMessageMutation();

  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await deleteMessage(messageId).unwrap();
    } catch (error) {
      console.error("Gagal menghapus pesan:", error);
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="hidden rounded-full group-hover:block">
        <div className="flex items-center gap-2 px-4">
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            className="hover:text-red-500"
          >
            <FaTrash size={12} />
          </Button>

          <Button
            onClick={onEdit}
            disabled={isDeleting}
            className="hover:text-secondary"
          >
            <MdEdit />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatAttachment;
