import React from "react";
import { useMeQuery } from "../generated/graphql";
import NextLink from "next/link";
import AddBook from "./AddBook";

interface ModalProps {
  onClick: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClick }) => {
  const { data, loading } = useMeQuery({
    skip: typeof window === "undefined",
  });

  if (loading) {
    return null;
  }

  return (
    <div className="fixed w-full h-full top-0 z-30 overflow-scroll ">
      <div
        className="absolute w-full h-full top-0  bg-gray-800 opacity-60 "
        onClick={onClick}
      ></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 w-10/12 max-w-lg bg-white max-h-3/4  z-50 overflow-scroll">
        {!data?.me ? (
          <div className="w-full text-center">
            <p>
              Please{" "}
              <NextLink href="/login">
                <span className="text-teal-400 underline font-bold cursor-pointer">
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
          </div>
        ) : (
          <AddBook onClick={onClick} />
        )}
      </div>
    </div>
  );
};

export default Modal;
