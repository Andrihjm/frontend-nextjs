import LoginForm from "@/components/forms/auth/login-form";
import BackButton from "@/components/globals/back-button";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex h-full w-full flex-col py-6">
      <BackButton className="font-bold">
        <Image
          src={"/svg/arrow-left.svg"}
          width={100}
          height={100}
          alt={"arrow-left-icon"}
          className="h-4 w-4"
        />
        Back
      </BackButton>

      <div className="flex h-full w-full flex-col items-center justify-center">
        <LoginForm />

        <div className="mt-8 flex items-center justify-center gap-1 text-sm">
          <p>No account?</p>
          <Link href={"/register"} className="text-golden hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
