interface InputProps {
  type?: "text" | "password" | "email" | "number";
  id?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dir?: "rtl" | "ltr";
  className?: string;
  placeholder?: string;
}

const Input = ({
  type,
  id,
  value,
  onChange,
  dir,
  className,
  placeholder,
}: InputProps) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      dir={dir}
      required
      placeholder={placeholder}
      className={`w-full outline-none ${className}`}
    />
  );
};

export default Input;
