import React from "react";

interface MessageProps {
  variant: string;
  children: React.ReactNode;
}

const Message = ({ variant, children }: MessageProps) => {
  const getVariantClass = () => {
    switch (variant) {
      case "succcess":
        return "bg-green-100 text-green-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return <div className={`rounded p-4 ${getVariantClass()}`}>{children}</div>;
};

export default Message;
