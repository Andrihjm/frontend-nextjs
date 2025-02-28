"use client";

import BackButton from "@/components/globals/back-button";
import Button from "@/components/ui/button";
import { useGetprofileQuery } from "@/redux/api/slice/profile-api-slice";
import { useGetUserQuery } from "@/redux/api/slice/user-api-slice";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa6";

const ChatHeader = () => {
  const { data, isLoading, isError } = useGetprofileQuery(undefined);
  const { data: auth } = useGetUserQuery(undefined);

  return (
    <div className="z-20 flex items-center justify-between border-b border-b-secondary py-2">
      <div className="flex items-center gap-1">
        <BackButton className="pl-1">
          <FaArrowLeft size={18} />
        </BackButton>

        {data ? (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 overflow-hidden rounded-full">
              <Image
                src={
                  data.image ||
                  "https://i.pinimg.com/736x/3c/ae/07/3cae079ca0b9e55ec6bfc1b358c9b1e2.jpg"
                }
                alt="user"
                width={100}
                height={100}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="font-semibold">{data?.displayName}</p>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 overflow-hidden rounded-full">
              <Image
                src={
                  "https://i.pinimg.com/736x/3c/ae/07/3cae079ca0b9e55ec6bfc1b358c9b1e2.jpg"
                }
                alt="user"
                width={100}
                height={100}
                className="h-full w-full object-cover"
              />
            </div>
            Teman saya
          </div>
        )}
      </div>

      <Button className="max-w-max">
        <BsThreeDotsVertical size={18} />
      </Button>
    </div>
  );
};

export default ChatHeader;
