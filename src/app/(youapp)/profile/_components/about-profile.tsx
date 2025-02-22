"use client";

import ProfileForm from "@/components/forms/youapp/profile-form";
import Badge from "@/components/ui/badge";
import Card from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

const AboutProfile = () => {
  const [isShowAboutForm, setIsShowAboutForm] = useState(false);

  const handleShowAboutForm = () => {
    setIsShowAboutForm(!isShowAboutForm);
  };

  return (
    <div className="my-4">
      {isShowAboutForm ? (
        <ProfileForm />
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

          <p className="pt-4 leading-5 text-secondary">
            Add in your your to help others know you better
          </p>
        </Card>
      )}
    </div>
  );
};

export default AboutProfile;
