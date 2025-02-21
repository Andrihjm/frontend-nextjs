interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const Button = ({
  type = "button",
  onClick,
  className,
  children,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex w-full items-center justify-center rounded-lg py-2 text-center ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
