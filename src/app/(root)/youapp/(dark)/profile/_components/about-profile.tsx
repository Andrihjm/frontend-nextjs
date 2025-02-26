"use client";

import ProfileForm from "@/components/forms/youapp/profile-form";
import LabelValue from "@/components/globals/label-value";
import Message from "@/components/tamplates/message";
import Card from "@/components/ui/card";
import Spinner from "@/components/ui/spinner";
import { useGetprofileQuery } from "@/redux/api/slice/profile-api-slice";
import { formatAge } from "@/utils/format-date";
import Image from "next/image";
import { useState } from "react";

const AboutProfile = () => {
  const [isShowAboutForm, setIsShowAboutForm] = useState(false);

  const { data, isLoading, isError } = useGetprofileQuery(undefined);

  const handleShowAboutForm = () => {
    setIsShowAboutForm(!isShowAboutForm);
  };

  const handleSaveUpdate = () => {
    setIsShowAboutForm(false);
  };

  return (
    <div className="my-4">
      {isShowAboutForm ? (
        <>
          {data ? (
            <ProfileForm type="UPDATE" onSave={handleSaveUpdate} />
          ) : (
            <ProfileForm type="CREATE" onSave={handleSaveUpdate} />
          )}
        </>
      ) : (
        <Card>
          <div className="flex items-center justify-between">
            <p className="font-bold">About</p>
            <div
              onClick={handleShowAboutForm}
              className="h-5 w-5 cursor-pointer"
            >
              <Image
                src={"/svg/edit.svg"}
                alt=""
                width={100}
                height={100}
                className="h-full w-full"
              />
            </div>
          </div>

          <div className="pt-4">
            {isLoading ? (
              <Spinner className="!h-6 !w-6" />
            ) : isError ? (
              <Message variant="danger">Ini error</Message>
            ) : (
              <>
                {data ? (
                  <div className="space-y-2">
                    <LabelValue
                      label="Birthday"
                      value={formatAge(data.birthday)}
                    />
                    <LabelValue label="Horoscope" value={data.horoscope} />
                    <LabelValue label="Zodiac" value={data.zodiac} />
                    <LabelValue label="Height" value={`${data.height} cm`} />
                    <LabelValue label="Wight" value={`${data.weight} kg`} />
                  </div>
                ) : (
                  <p className="leading-5 text-secondary">
                    Add in your your to help others know you better
                  </p>
                )}
              </>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default AboutProfile;
