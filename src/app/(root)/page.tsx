import { cookies } from "next/headers";
import ChatUserList from "./youapp/message/_components/chat-user-list";
import { redirect } from "next/navigation";

const page = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/login");
  }

  return (
    <div className="h-screen w-full overflow-y-hidden">
      <ChatUserList />
    </div>
  );
};

export default page;
