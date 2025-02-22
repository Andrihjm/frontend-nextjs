import Badge from "@/components/ui/badge";
import Image from "next/image";

const UploadImageProfile = () => {
  return (
    <div className="relative mt-4">
      <div className="h-[190px] w-full">
        <Image
          src={"/example.png"}
          alt=""
          width={100}
          height={100}
          className="h-full w-full rounded-xl"
        />
      </div>

      <div className="absolute bottom-4 left-4 flex flex-col font-semibold">
        <span className="text-lg">@jhondow</span>
        <span className="text-xs font-normal">Male</span>
        <div className="mt-2 flex items-center gap-2 text-sm">
          <Badge className="flex items-center gap-2 bg-[#1F2420] !px-4 !py-2">
            <span>@</span> Virgo
          </Badge>
          <Badge className="flex items-center gap-2 bg-[#1F2420] !px-4 !py-2">
            <span>@</span> Virgo
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default UploadImageProfile;
