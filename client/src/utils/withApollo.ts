import { withApollo } from "next-apollo";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { NextPageContext } from "next";
import { Pagination } from "../generated/graphql";
console.log("apiii", process.env.NEXT_PUBLIC_API_URL);
export const apolloClient = (
  ctx: NextPageContext
): ApolloClient<NormalizedCacheObject> =>
  new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getBooks: {
              keyArgs: [],
              merge(
                existing: Pagination | undefined,
                incoming: Pagination
              ): Pagination {
                return {
                  moreBooks: incoming.moreBooks,
                  books: [...(existing?.books || []), ...incoming.books],
                };
              },
            },
          },
        },
      },
    }),
  });

export default withApollo(apolloClient);
