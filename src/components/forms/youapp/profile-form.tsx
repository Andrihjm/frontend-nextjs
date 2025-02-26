"use client";

import DropdownMenu, {
  DropdownMenuItem,
} from "@/components/tamplates/dropdown-menu";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import {
  useCreateProfileMutation,
  useGetprofileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/slice/profile-api-slice";
import { ProfileFormSchema, profileSchema } from "@/schemas/user-schema";
import { formatBirthday } from "@/utils/format-date";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaChevronDown } from "react-icons/fa6";

interface ProfileFormProps {
  type: "CREATE" | "UPDATE";
  onSave?: any;
}

const ProfileForm = ({ type, onSave }: ProfileFormProps) => {
  const [gender, setGender] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [createProfile, { isLoading: isCreating }] = useCreateProfileMutation();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const { data, isLoading, isError } = useGetprofileQuery(undefined);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (data: ProfileFormSchema) => {
    try {
      if (type === "CREATE" && !data.image) {
        throw new Error("Profile image is required.");
      }

      if (type === "CREATE") {
        await createProfile(data).unwrap();
        onSave();
      } else {
        await updateProfile(data).unwrap();
        onSave();
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender);
    setValue("gender", selectedGender);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="font-bold">About</p>
          <button
            type="submit"
            disabled={isCreating || isUpdating}
            className="text-golden text-sm"
          >
            {isCreating || isUpdating ? "Saving..." : "Save & Update"}
          </button>
        </div>

        <div className="">
          <div onClick={handleImageClick} className="cursor-pointer">
            {preview ? (
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white-opacity">
                <Image
                  src={preview}
                  alt="Preview"
                  width={60}
                  height={60}
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white-opacity">
                  <Image
                    src={"/svg/plus.svg"}
                    alt="plus icon"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </div>
                Add image
              </div>
            )}
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="name" className="flex items-center justify-between">
            <p className="w-[50%] text-sm text-secondary">Display name:</p>
            <Input
              id="name"
              type="text"
              placeholder="Enter Display Name"
              defaultValue={data.displayName}
              {...register("displayName")}
              className="rounded-xl border-2 border-secondary bg-white-opacity px-2 py-1.5 placeholder:text-sm placeholder:text-secondary"
            />
          </label>
          {errors.displayName && (
            <p className="text-sm text-red-500">{errors.displayName.message}</p>
          )}

          <label
            htmlFor="gender"
            className="relative flex items-center justify-between"
          >
            <div className="absolute right-4">
              <DropdownMenu
                trigger={<FaChevronDown className="text-secondary" />}
                align="left"
              >
                <DropdownMenuItem onClick={() => handleGenderSelect("Male")}>
                  Male
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleGenderSelect("Female")}>
                  Female
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleGenderSelect("Other")}>
                  Other
                </DropdownMenuItem>
              </DropdownMenu>
            </div>

            <p className="w-[50%] text-sm text-secondary">Gender:</p>
            <Input
              id="gender"
              type="text"
              placeholder="Select gender"
              value={gender}
              // defaultValue={data.gender}
              readOnly={true}
              className="rounded-xl border-2 border-secondary bg-white-opacity px-2 py-1.5 placeholder:text-sm placeholder:text-secondary"
            />
            <input type="hidden" {...register("gender")} />
          </label>
          {errors.gender && (
            <p className="text-sm text-red-500">{errors.gender.message}</p>
          )}

          <label
            htmlFor="birthday"
            className="flex items-center justify-between"
          >
            <p className="w-[50%] text-sm text-secondary">Birthday:</p>
            <Input
              id="birthday"
              // type="date"
              placeholder="DD MM YYYY"
              {...register("birthday")}
              defaultValue={formatBirthday(data.birthday)}
              className="rounded-xl border-2 border-secondary bg-white-opacity px-2 py-1.5 placeholder:text-sm placeholder:text-secondary"
            />
          </label>
          {errors.birthday && (
            <p className="text-sm text-red-500">{errors.birthday.message}</p>
          )}

          <label
            htmlFor="horoscope"
            className="flex items-center justify-between"
          >
            <p className="w-[50%] text-sm text-secondary">Horoscope:</p>
            <Input
              id="horoscope"
              placeholder="--"
              {...register("horoscope")}
              defaultValue={data.horoscope}
              readOnly={true}
              className="rounded-xl border-2 border-secondary bg-white-opacity px-2 py-1.5 placeholder:text-sm placeholder:text-secondary"
            />
          </label>

          <label htmlFor="zodiac" className="flex items-center justify-between">
            <p className="w-[50%] text-sm text-secondary">Zodiac:</p>
            <Input
              id="zodiac"
              placeholder="--"
              {...register("zodiac")}
              defaultValue={data.zodiac}
              readOnly={true}
              className="rounded-xl border-2 border-secondary bg-white-opacity px-2 py-1.5 placeholder:text-sm placeholder:text-secondary"
            />
          </label>

          <label htmlFor="height" className="flex items-center justify-between">
            <p className="w-[50%] text-sm text-secondary">Height (cm):</p>
            <Input
              id="height"
              placeholder="Add height"
              {...register("height")}
              defaultValue={data.height}
              className="rounded-xl border-2 border-secondary bg-white-opacity px-2 py-1.5 placeholder:text-sm placeholder:text-secondary"
            />
          </label>
          {errors.height && (
            <p className="text-sm text-red-500">{errors.height.message}</p>
          )}

          <label htmlFor="weight" className="flex items-center justify-between">
            <p className="w-[50%] text-sm text-secondary">Weight (kg):</p>
            <Input
              id="weight"
              placeholder="Add weight"
              {...register("weight")}
              defaultValue={data.weight}
              className="rounded-xl border-2 border-secondary bg-white-opacity px-2 py-1.5 placeholder:text-sm placeholder:text-secondary"
            />
          </label>
          {errors.weight && (
            <p className="text-sm text-red-500">{errors.weight.message}</p>
          )}
        </div>
      </form>
    </Card>
  );
};

export default ProfileForm;
