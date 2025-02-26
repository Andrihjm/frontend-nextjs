"use client";

import BackButton from "@/components/globals/back-button";
import Input from "@/components/ui/input";
import {
  useCreateInterestMutation,
  useDeleteInterestMutation,
  useGetInterestQuery,
} from "@/redux/api/slice/interest-api-slice";
import { InterestFormSchema, interestSchema } from "@/schemas/index-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormInputIntersetProps {
  type: "CREATE" | "UPDATE";
}

const FormInputInterset = ({ type }: FormInputIntersetProps) => {
  const [interests, setInterests] = useState<string[]>([]);
  const [createInterest, { isLoading: isCreating }] =
    useCreateInterestMutation();
  const { data } = useGetInterestQuery([]);
  const [deleteInterest, { isLoading: isDeleting }] =
    useDeleteInterestMutation();

  const { register, handleSubmit, reset, getValues, setValue } =
    useForm<InterestFormSchema>({
      resolver: zodResolver(interestSchema),
    });

  const handleAddInterest = () => {
    const newInterest = getValues("name").trim();
    if (newInterest && !interests.includes(newInterest)) {
      setInterests((prev) => [...prev, newInterest]);
      setValue("name", "");
    }
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setInterests((prev) => prev.filter((item) => item !== interestToRemove));
  };

  const onSubmit = async () => {
    try {
      const payload = interests.map((name) => ({ name }));
      if (type === "CREATE") {
        await Promise.all(
          payload.map((interest) => createInterest(interest).unwrap()),
        );
      }
      setInterests([]);
      reset();
    } catch (error) {
      console.error("Error saving interests:", error);
    }
  };

  const handleDeleteInterest = async (interestId: string) => {
    try {
      await deleteInterest(interestId).unwrap();
    } catch (error) {
      console.error("Failed to delete interest:", error);
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="flex items-center justify-between py-6">
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
        {interests.length > 0 && (
          <button
            type="submit"
            disabled={isCreating}
            onClick={onSubmit}
            className="text-blue font-semibold"
          >
            {isCreating ? "Saving..." : "Save"}
          </button>
        )}
      </div>

      <div className="flex w-full flex-grow flex-col justify-center px-4">
        <div className="font-semibold">
          <h1 className="text-golden text-lg">Tell everyone about yourself</h1>
          <p className="text-2xl">What interests you?</p>

          <form onSubmit={handleSubmit(onSubmit)} className="pt-6">
            <div className="w-full rounded-xl bg-white-opacity px-6 py-4">
              <div className="flex flex-wrap gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  {data?.map((interest: any) => (
                    <div
                      key={interest._id}
                      className="flex items-center rounded-lg bg-white-opacity px-4 py-2 text-white"
                    >
                      {interest.name}

                      <button
                        type="button"
                        onClick={() => handleDeleteInterest(interest._id)}
                        disabled={isDeleting}
                        className="ml-2"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                {interests.map((interest, index) => (
                  <div
                    key={index}
                    className="flex items-center rounded-lg bg-white-opacity px-4 py-2 text-white"
                  >
                    {interest}
                    <button
                      type="button"
                      onClick={() => handleRemoveInterest(interest)}
                      className="ml-2"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <Input
                  type="text"
                  {...register("name")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddInterest();
                    }
                  }}
                  className="w-full rounded-lg border border-secondary bg-transparent px-3 py-2 text-white focus:outline-none"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormInputInterset;
