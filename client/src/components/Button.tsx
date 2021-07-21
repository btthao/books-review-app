import React, { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  width?: string;
  rounded?: boolean;
};

const Button: React.FC<ButtonProps> = ({ width, rounded, text, ...props }) => {
  return (
    <button
      {...props}
      className={` ${width == "auto" ? "w-auto" : "w-full"} ${
        rounded && "rounded-full"
      } m-auto  text-white bg-teal-400  py-2 px-4  shadow-lg  uppercase `}
    >
      {text}
    </button>
  );
};

export default Button;
