import { withApollo } from "next-apollo";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { NextPageContext } from "next";
import { Pagination } from "../generated/graphql";

export const apolloClient = (
  ctx: NextPageContext
): ApolloClient<NormalizedCacheObject> =>
  new ApolloClient({
    uri: "http://localhost:4000/graphql",
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
