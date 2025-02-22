"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useRegisterMutation } from "@/redux/api/slice/user-api-slice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const router = useRouter();

  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.email ||
      !form.username ||
      !form.password ||
      !form.confirmPassword
    ) {
      return toast.error("All fields are required.");
    }

    if (form.password !== form.confirmPassword) {
      return toast.error("Password and confirm password do not match.");
    }

    try {
      await register({
        email: form.email,
        username: form.username,
        password: form.password,
      }).unwrap();

      toast.success("Registration successful! Please come in.");
      router.push("/login");
    } catch (err: any) {
      toast.error(err?.data?.message || "Registration failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <h2 className="text-3xl font-bold">Register</h2>

      <div className="flex flex-col items-center gap-4">
        <Input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="rounded-xl bg-white-opacity px-4 py-4"
          value={form.email}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="username"
          placeholder="Create Username"
          className="rounded-xl bg-white-opacity px-4 py-4"
          value={form.username}
          onChange={handleChange}
        />

        <div className="flex w-full items-center justify-between rounded-xl bg-white-opacity px-4 py-4">
          <Input
            type={isShowPassword ? "text" : "password"}
            name="password"
            placeholder="Create Password"
            className="bg-transparent"
            value={form.password}
            onChange={handleChange}
          />
          {isShowPassword ? (
            <IoEyeOutline
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="h-6 w-6 cursor-pointer text-yellow-100"
            />
          ) : (
            <IoEyeOffOutline
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="h-6 w-6 cursor-pointer text-yellow-100"
            />
          )}
        </div>

        <div className="flex w-full items-center justify-between rounded-xl bg-white-opacity px-4 py-4">
          <Input
            type={isShowConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="bg-transparent"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          {isShowConfirmPassword ? (
            <IoEyeOutline
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              className="h-6 w-6 cursor-pointer text-yellow-100"
            />
          ) : (
            <IoEyeOffOutline
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
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
        {isLoading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
};

export default RegisterForm;
