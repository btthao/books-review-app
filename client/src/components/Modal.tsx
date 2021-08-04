import React from "react";
import { useMeQuery } from "../generated/graphql";
import NextLink from "next/link";
import AddBook from "./AddBook";

interface ModalProps {
  onClick: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClick, children }) => {
  const { data, loading } = useMeQuery({
    skip: typeof window === "undefined",
  });
  return (
    <div className="fixed w-full h-full top-0 left-0 z-40 overflow-scroll ">
      <div
        className="absolute w-full h-full top-0 left-0 opacity-60 bg-gray-800  "
        onClick={onClick}
      ></div>
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 w-10/12 max-w-lg   bg-gray-200 max-h-3/4  z-50 overflow-scroll rounded-md text-base font-normal`}
      >
        {!data?.me ? (
          <p className="text-gray-800 text-center">
            Please{" "}
            <NextLink href="/login">
              <span className="text-teal-500 underline font-bold cursor-pointer">
                login
              </span>
            </NextLink>{" "}
            or{" "}
            <NextLink href="/register">
              <span className="text-teal-400 underline font-bold cursor-pointer">
                register
              </span>
            </NextLink>{" "}
            first before continuing.
          </p>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default Modal;
