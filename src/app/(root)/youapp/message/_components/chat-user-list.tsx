"use client";

import AppFooter from "@/components/globals/app-footer";
import ChatListSearch from "@/components/globals/chat-list-search";
import Badge from "@/components/ui/badge";
import { useGetAllUserQuery } from "@/redux/api/slice/user-api-slice";
import { UserListTypes } from "@/types/index.types";
import Image from "next/image";
import Link from "next/link";

const ChatUserList = () => {
  const { data, isLoading, isError } = useGetAllUserQuery([]);

  return (
    <div className="my-4 flex h-screen flex-col gap-2">
      <ChatListSearch />

      <div className="scrollbar-custom flex h-full flex-col overflow-y-auto">
        {data?.map((userList: UserListTypes) => (
          <Link
            key={userList._id}
            href={`youapp/message/${userList._id}`}
            className="relative flex items-center gap-2 rounded-lg px-2 py-4 transition hover:bg-white-opacity"
          >
            <div className="h-12 w-12 overflow-hidden rounded-full">
              <Image
                src={
                  "https://i.pinimg.com/736x/3c/ae/07/3cae079ca0b9e55ec6bfc1b358c9b1e2.jpg"
                }
                alt="user"
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-semibold text-white">{userList.username}</p>
              <p className="line-clamp-1 text-sm text-gray-400">
                {userList._id}
              </p>
            </div>

            <Badge className="absolute right-6 top-6 h-2 w-2 rounded-full bg-blue-600 px-0 py-0" />
          </Link>
        ))}
      </div>

      <AppFooter />
    </div>
  );
};

export default ChatUserList;
