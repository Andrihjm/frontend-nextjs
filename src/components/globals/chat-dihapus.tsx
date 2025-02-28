import { MdDoNotDisturbAlt } from "react-icons/md";

const ChatDihapus = () => {
  return (
    <p className="flex items-center text-sm italic text-secondary">
      <MdDoNotDisturbAlt />
      This message has been deleted.
    </p>
  );
};

export default ChatDihapus;
