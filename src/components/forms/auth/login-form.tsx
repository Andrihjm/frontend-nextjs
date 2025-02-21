"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const LoginForm = () => {
  const [isShowPassword, setisShowPassword] = useState(false);

  const handleShowPassword = () => {
    setisShowPassword(!isShowPassword);
  };

  return (
    <form className="w-full space-y-6">
      <h2 className="text-3xl font-bold">Login</h2>

      <div className="flex flex-col items-center gap-4">
        <Input
          type="email"
          placeholder="Enter Username/Email"
          className="bg-white-opacity rounded-xl px-4 py-4"
        />
        <div className="bg-white-opacity flex w-full items-center justify-between rounded-xl px-4 py-4">
          <Input
            type={isShowPassword ? "text" : "password"}
            placeholder="Enter Password"
            className="mr-2 bg-transparent"
          />
          {isShowPassword ? (
            <IoEyeOutline
              onClick={handleShowPassword}
              className="h-6 w-6 cursor-pointer text-yellow-100"
            />
          ) : (
            <IoEyeOffOutline
              onClick={handleShowPassword}
              className="h-6 w-6 cursor-pointer text-yellow-100"
            />
          )}
        </div>
      </div>

      <Button type="submit" className="btn-gradient py-3 text-lg font-bold">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
