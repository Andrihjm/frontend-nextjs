interface InputProps {
  type?: "text" | "password" | "email" | "number";
  id?: string;
  dir?: "rtl" | "ltr";
  className?: string;
  placeholder?: string;
}

const Input = ({ type, id, dir, className, placeholder }: InputProps) => {
  return (
    <input
      id={id}
      type={type}
      dir={dir}
      placeholder={placeholder}
      className={`w-full outline-none ${className}`}
    />
  );
};

export default Input;
