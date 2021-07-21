import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useApolloClient } from "@apollo/client";

interface NavProps {}

const Nav: React.FC<NavProps> = ({}) => {
  const { data, loading } = useMeQuery({
    skip: typeof window === "undefined",
  });
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();

  return (
    <div className=" flex items-center  justify-between border-b border-gray-700 h-16 px-4 md:px-10 xl:px-20 ">
      <h1 className=" font-semibold text-2xl sm:text-3xl">Liber</h1>
      {!loading && (
        <div>
          {data?.me ? (
            <div className="flex items-center font-semibold">
              <h1>Hi {data.me.username}!</h1>
              <button
                type="button"
                className="px-2 py-1 rounded-md bg-gray-700 text-white ml-4 font-semibold sm:ml-12 "
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
                <button type="button" className="font-semibold ">
                  Register
                </button>
              </NextLink>
              <NextLink href="/login">
                <button type="button" className="ml-4 font-semibold ">
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
