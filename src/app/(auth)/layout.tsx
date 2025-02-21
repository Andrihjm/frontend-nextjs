const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gradient flex h-screen w-full justify-center px-4">
      <div className="w-full max-w-[360px]">{children}</div>
    </div>
  );
};

export default layout;
