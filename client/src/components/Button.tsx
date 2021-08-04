import React, { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ text, className, ...props }) => {
  return (
    <button
      {...props}
      className={`m-auto  text-white   py-2 px-4  shadow-lg  uppercase  ${className} `}
    >
      {text}
    </button>
  );
};

export default Button;
