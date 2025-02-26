"use client";

import Message from "@/components/tamplates/message";
import Card from "@/components/ui/card";
import Spinner from "@/components/ui/spinner";
import { useGetInterestQuery } from "@/redux/api/slice/interest-api-slice";
import { InterestTypes } from "@/types/index.types";
import Image from "next/image";
import Link from "next/link";

const InterestProfile = () => {
  const { data, isLoading, isError } = useGetInterestQuery({});

  return (
    <div className="">
      <Card>
        <div className="flex items-center justify-between">
          <p className="font-bold">Interest</p>
          <Link href="/youapp/interest" className="h-5 w-5 cursor-pointer">
            <Image
              src={"/svg/edit.svg"}
              alt=""
              width={100}
              height={100}
              className="h-full w-full"
            />
          </Link>
        </div>

        <div className="pt-4">
          {isLoading ? (
            <Spinner className="!h-6 !w-6" />
          ) : isError ? (
            <Message variant="danger">Ini error</Message>
          ) : (
            <>
              {data ? (
                <div className="flex flex-wrap items-center gap-2">
                  {data.map((interest: InterestTypes) => (
                    <div
                      key={interest._id}
                      className="max-w-max rounded-full bg-white-opacity px-4 py-2"
                    >
                      {interest.name}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="leading-5 text-secondary">
                  Add in your interest to find a better match
                </p>
              )}
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default InterestProfile;
