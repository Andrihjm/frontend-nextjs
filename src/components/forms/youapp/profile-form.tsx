"use client";

import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import Image from "next/image";
import { useRef } from "react";

const ProfileForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card>
      <div className="">
        <div className="flex items-center justify-between">
          <p className="font-bold">About</p>
          <p className="text-golden cursor-pointer text-sm">Save & Update</p>
        </div>

        <div className="py-6">
          <div
            onClick={handleImageClick}
            className="flex max-w-max cursor-pointer items-center gap-2 font-medium"
          >
            <div className="bg-white-opacity flex h-14 w-14 items-center justify-center rounded-xl">
              {/* <Image
                src={"/example.png"}
                alt="add image icon"
                width={100}
                height={100}
                className="h-full w-full rounded-xl object-cover"
              /> */}
              <Image
                src={"/svg/plus.svg"}
                alt="add image icon"
                width={100}
                height={100}
                className="h-6 w-6"
              />
            </div>
            Add image
            <input ref={fileInputRef} type="file" className="hidden" />
          </div>
        </div>

        <div className="space-y-3">
          <label htmlFor="name" className="flex items-center justify-between">
            <p className="w-[50%] cursor-pointer text-nowrap text-sm text-secondary">
              Display name:
            </p>
            <Input
              id="name"
              type="text"
              dir="rtl"
              placeholder="Enter Name"
              className="bg-white-opacity rounded-xl border-[2px] border-secondary px-2 py-1.5 placeholder:text-right placeholder:text-sm placeholder:text-secondary"
            />
          </label>
          <label htmlFor="gender" className="flex items-center justify-between">
            <p className="w-[50%] cursor-pointer text-nowrap text-sm text-secondary">
              Gender:
            </p>
            <Input
              id="gender"
              type="text"
              dir="rtl"
              placeholder="Select gender"
              className="bg-white-opacity rounded-xl border-[2px] border-secondary px-2 py-1.5 placeholder:text-right placeholder:text-sm placeholder:text-secondary"
            />
          </label>
          <label
            htmlFor="birthday"
            className="flex items-center justify-between"
          >
            <p className="w-[50%] cursor-pointer text-nowrap text-sm text-secondary">
              Birthday:
            </p>
            <Input
              id="birthday"
              type="text"
              dir="rtl"
              placeholder="Birthday"
              className="bg-white-opacity rounded-xl border-[2px] border-secondary px-2 py-1.5 placeholder:text-right placeholder:text-sm placeholder:text-secondary"
            />
          </label>
          <label
            htmlFor="horoscope"
            className="flex items-center justify-between text-secondary"
          >
            <p className="w-[50%] cursor-pointer text-nowrap text-sm">
              Horoscope:
            </p>
            <Input
              id="horoscope"
              type="text"
              dir="rtl"
              placeholder="--"
              className="bg-white-opacity rounded-xl border-[2px] border-secondary px-2 py-1.5 placeholder:text-right placeholder:text-sm placeholder:text-secondary"
            />
          </label>
          <label
            htmlFor="zodiac"
            className="flex items-center justify-between text-secondary"
          >
            <p className="w-[50%] cursor-pointer text-nowrap text-sm">
              Zodiac:
            </p>
            <Input
              id="zodiac"
              type="text"
              dir="rtl"
              placeholder="--"
              className="bg-white-opacity rounded-xl border-[2px] border-secondary px-2 py-1.5 placeholder:text-right placeholder:text-sm placeholder:text-secondary"
            />
          </label>
          <label htmlFor="height" className="flex items-center justify-between">
            <p className="w-[50%] cursor-pointer text-nowrap text-sm text-secondary">
              Height:
            </p>
            <Input
              id="height"
              type="text"
              dir="rtl"
              placeholder="Add height"
              className="bg-white-opacity rounded-xl border-[2px] border-secondary px-2 py-1.5 placeholder:text-right placeholder:text-sm placeholder:text-secondary"
            />
          </label>
          <label htmlFor="wight" className="flex items-center justify-between">
            <p className="w-[50%] cursor-pointer text-nowrap text-sm text-secondary">
              Wight:
            </p>
            <Input
              id="Wight"
              type="text"
              dir="rtl"
              placeholder="Add wight"
              className="bg-white-opacity rounded-xl border-[2px] border-secondary px-2 py-1.5 placeholder:text-right placeholder:text-sm placeholder:text-secondary"
            />
          </label>
        </div>
      </div>
    </Card>
  );
};

export default ProfileForm;
