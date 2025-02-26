"use client";

import { zodiacIcons } from "@/components/globals/zodiac-icons";
import Badge from "@/components/ui/badge";
import Spinner from "@/components/ui/spinner";
import { useGetprofileQuery } from "@/redux/api/slice/profile-api-slice";
import { useGetUserQuery } from "@/redux/api/slice/user-api-slice";
import Image from "next/image";

const UploadImageProfile = () => {
  const { data, isLoading, isError } = useGetprofileQuery(undefined);
  const { data: auth } = useGetUserQuery(undefined);

  return (
    <div className="">
      {isLoading ? (
        <Spinner className="!h-6 !w-6" />
      ) : isError ? (
        <div className="">ini error</div>
      ) : (
        <>
          {data ? (
            <div className="relative mt-4">
              <div className="h-[190px] w-full">
                <Image
                  src={data.image || "example.png"}
                  alt={data.displayName}
                  width={100}
                  height={100}
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>

              <div className="absolute bottom-4 left-4 flex flex-col font-semibold">
                <span className="text-lg">{data.displayName}</span>
                <span className="text-xs font-normal">{data.gender}</span>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <Badge className="flex items-center gap-1 bg-[#1F2420] !px-4 !py-2">
                    {/* {zodiacIcons[data.zodiac] && (
                      <div>{zodiacIcons[data.zodiac]}</div>
                    )} */}
                    {data.horoscope}
                  </Badge>
                  <Badge className="flex items-center gap-1 bg-[#1F2420] !px-4 !py-2">
                    {/* {zodiacIcons[data.zodiac] && (
                      <div>{zodiacIcons[data.zodiac]}</div>
                    )} */}
                    {data.zodiac}
                  </Badge>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative mt-4">
              <div className="h-[180px] w-full rounded-xl bg-white-opacity" />
              <span className="absolute bottom-4 left-4 text-lg font-bold">
                {auth.username}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UploadImageProfile;
