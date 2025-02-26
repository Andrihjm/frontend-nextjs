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
  onKeyDown?: (e: any) => void;
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
      onKeyDown,
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
        onKeyDown={onKeyDown}
        className={`w-full outline-none ${className}`}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
