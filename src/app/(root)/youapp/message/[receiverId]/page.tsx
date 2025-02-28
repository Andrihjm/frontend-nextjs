"use client";

import ChatContent from "../_components/chat-content";

interface PageProps {
  params: {
    receiverId: string;
  };
}

const page = ({ params }: PageProps) => {
  return (
    <div className="relative">
      <ChatContent receiverId={params.receiverId} />
    </div>
  );
};

export default page;
