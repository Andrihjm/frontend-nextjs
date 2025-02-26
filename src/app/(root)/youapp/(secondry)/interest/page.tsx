import FormInputInterset from "@/components/forms/youapp/form-input-interset";
import BackButton from "@/components/globals/back-button";
import Image from "next/image";

const page = () => {
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
        <button className="text-blue font-semibold">Save</button>
      </div>

      <div className="flex w-full flex-grow flex-col justify-center px-4">
        <div className="font-semibold">
          <h1 className="text-golden text-lg">Tell everyone about yourself</h1>
          <p className="text-2xl">What interests you?</p>

          <FormInputInterset />
        </div>
      </div>
    </div>
  );
};

export default page;
