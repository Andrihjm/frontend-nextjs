import Input from "../ui/input";
import { CiSearch } from "react-icons/ci";

const ChatListSearch = () => {
  return (
    <div className="sticky top-0 z-10 rounded-lg bg-white-opacity px-6 py-2">
      <div className="flex items-center gap-2">
        <CiSearch size={24} className="cursor-pointer" />
        <Input placeholder="Search..." className="w-full bg-transparent" />
      </div>
    </div>
  );
};

export default ChatListSearch;
