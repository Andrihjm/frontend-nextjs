"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/schemas/user-schema";
import { useLoginMutation } from "@/redux/api/slice/user-api-slice";

const LoginForm = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const response = await login(data).unwrap();

      Cookies.set("token", response.access_token, {
        expires: 7,
      });
      router.push("/youapp/profile");
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <h2 className="text-3xl font-bold">Login</h2>

      <div className="flex flex-col gap-4">
        <div>
          <Input
            placeholder="Enter Email"
            {...register("email")}
            className="rounded-xl bg-white-opacity px-4 py-4"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex w-full items-center justify-between rounded-xl bg-white-opacity px-4 py-4">
          <Input
            type={isShowPassword ? "text" : "password"}
            placeholder="Enter Password"
            {...register("password")}
            className="mr-2 bg-transparent"
          />
          {isShowPassword ? (
            <IoEyeOutline
              onClick={() => setIsShowPassword((prev) => !prev)}
              className="h-6 w-6 cursor-pointer text-yellow-100"
            />
          ) : (
            <IoEyeOffOutline
              onClick={() => setIsShowPassword((prev) => !prev)}
              className="h-6 w-6 cursor-pointer text-yellow-100"
            />
          )}
        </div>
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="btn-gradient py-3 text-lg font-bold"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
