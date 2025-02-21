interface InputProps {
  type?: "text" | "password" | "email" | "number";
  className?: string;
  placeholder?: string;
}

const Input = ({ type, className, placeholder }: InputProps) => {
  return <input type={type} placeholder={placeholder} className={`w-full outline-none ${className}`} />;
};

export default Input;
