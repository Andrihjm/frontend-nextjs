"use client";

import BackButton from "@/components/globals/back-button";
import { useGetprofileQuery } from "@/redux/api/slice/profile-api-slice";
import { useGetUserQuery } from "@/redux/api/slice/user-api-slice";
import Image from "next/image";

const HeaderProifle = () => {
  const { data } = useGetprofileQuery(undefined);
  const { data: auth } = useGetUserQuery(undefined);

  return (
    <div className="grid grid-cols-3 items-center justify-center">
      <BackButton className="hover:text-golden font-bold">
        <Image
          src={"/svg/arrow-left.svg"}
          width={100}
          height={100}
          alt={"arrow-left-icon"}
          className="h-4 w-4 hover:text-yellow-100"
        />
        Back
      </BackButton>

      <span className="flex justify-center font-semibold">
        {data ? data?.displayName : auth?.username}
      </span>
    </div>
  );
};

export default HeaderProifle;
