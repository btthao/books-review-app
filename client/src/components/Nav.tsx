import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useApolloClient } from "@apollo/client";

//done
const Nav: React.FC = () => {
  const { data, loading } = useMeQuery();
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();

  return (
    <div className=" flex items-center justify-between border-b border-gray-700 h-16 px-4 md:px-10 xl:px-20 sticky top-0  z-10 bg-gray-800">
      <NextLink href="/">
        <h1 className="cursor-pointer text-teal-400 font-semibold text-2xl sm:text-3xl">
          Liber
        </h1>
      </NextLink>
      {!loading && (
        <div>
          {data?.me ? (
            <div className="flex items-center font-semibold">
              <NextLink href="/user/[id]" as={`/user/${data?.me.id}`}>
                My books
              </NextLink>
              <button
                type="button"
                className="px-2 py-1 rounded-md bg-rose-300 text-gray-700 ml-4 font-semibold sm:ml-12 "
                onClick={async () => {
                  await logout();
                  await apolloClient.resetStore();
                }}
              >
                Log out
              </button>
            </div>
          ) : (
            <>
              <NextLink href="/register">
                <button
                  type="button"
                  className="sm:hover:underline font-semibold "
                >
                  Register
                </button>
              </NextLink>
              <NextLink href="/login">
                <button
                  type="button"
                  className="ml-4 font-semibold sm:hover:underline"
                >
                  Login
                </button>
              </NextLink>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Nav;
