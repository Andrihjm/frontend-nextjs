import Card from "@/components/ui/card";
import Image from "next/image";

const InterestProfile = () => {
  return (
    <div className="">
      <Card>
        <div className="flex items-center justify-between">
          <p className="font-bold">Interest</p>
          <div className="h-5 w-5 cursor-pointer">
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
          Add in your interest to find a better match
        </p>
      </Card>
    </div>
  );
};

export default InterestProfile;
