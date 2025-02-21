"use client";

import { useRouter } from "next/navigation";
import Button from "../ui/button";

interface BackButtonProps {
  className?: string;
  children: React.ReactNode;
}

const BackButton = ({ className, children }: BackButtonProps) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className={`flex max-w-max items-center gap-2 ${className}`}
    >
      {children}
    </Button>
  );
};

export default BackButton;
