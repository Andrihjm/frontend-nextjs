"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/api/slice/user-api-slice";

const LoginForm = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();

  const handleShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login({
        email,
        password,
      }).unwrap();

      Cookies.set("token", response.access_token, {
        expires: 7,
      });
      router.push("/profile");
    } catch (err: any) {
      setError(err?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <h2 className="text-3xl font-bold">Login</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col items-center gap-4">
        <Input
          placeholder="Enter Username/Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl bg-white-opacity px-4 py-4"
        />
        <div className="flex w-full items-center justify-between rounded-xl bg-white-opacity px-4 py-4">
          <Input
            type={isShowPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
