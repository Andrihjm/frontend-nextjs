import { forwardRef } from "react";

interface InputProps {
  type?: "text" | "password" | "email" | "number" | "date";
  id?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dir?: "rtl" | "ltr";
  className?: string;
  placeholder?: string;
  readOnly?: boolean;
  defaultValue?: any;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      id,
      name,
      value,
      onChange,
      dir,
      className,
      placeholder,
      readOnly,
      defaultValue,
    },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        dir={dir}
        placeholder={placeholder}
        readOnly={readOnly}
        defaultValue={defaultValue}
        className={`w-full outline-none ${className}`}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
