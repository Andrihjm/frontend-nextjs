import BackButton from "@/components/globals/back-button";
import Image from "next/image";
import AboutProfile from "./_components/about-profile";
import InterestProfile from "./_components/interest-profile";
import UploadImageProfile from "./_components/upload-image-profile";
import HeaderProifle from "./_components/header-proifle";

const page = () => {
  return (
    <div className="flex h-full w-full flex-col py-6">
      <HeaderProifle />
      <UploadImageProfile />
      <AboutProfile />
      <InterestProfile />
    </div>
  );
};

export default page;
