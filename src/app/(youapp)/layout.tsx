const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-dark flex h-full min-h-screen w-full justify-center px-2">
      <div className="w-full max-w-[380px]">{children}</div>
    </div>
  );
};

export default layout;
