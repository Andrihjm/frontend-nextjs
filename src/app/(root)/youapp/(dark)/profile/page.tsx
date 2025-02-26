import BackButton from "@/components/globals/back-button";
import Image from "next/image";
import AboutProfile from "./_components/about-profile";
import InterestProfile from "./_components/interest-profile";
import UploadImageProfile from "./_components/upload-image-profile";

const page = () => {
  return (
    <div className="flex h-full w-full flex-col py-6">
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
        <span className="flex justify-center font-semibold">@jhondow</span>
      </div>

      <UploadImageProfile />
      <AboutProfile />
      <InterestProfile />
    </div>
  );
};

export default page;
