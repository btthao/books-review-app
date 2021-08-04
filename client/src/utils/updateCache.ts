import { ApolloCache, ApolloClient, useApolloClient } from "@apollo/client";
import {
  Book,
  BookmarkMutation,
  EditPlotMutation,
  RateBookMutation,
  Rating,
  RemoveBookmarkMutation,
  GetUserBooksDocument,
  GetUserBooksQuery,
  BookDataFragment,
  CreateBookMutation,
} from "../generated/graphql";
import gql from "graphql-tag";
// import { apolloClient } from "../utils/withApollo";

export const updateCacheAfterVote = (
  value: number,
  userId: number,
  bookId: number,
  currentVote: number,
  cache: ApolloCache<RateBookMutation>
) => {
  if (currentVote && value == currentVote) return;

  const data = cache.readFragment<{
    ratedBy: Rating[];
    totalRaters: number;
    totalStars: number;
  }>({
    id: "Book:" + bookId,
    fragment: gql`
      fragment rate on Book {
        ratedBy
        totalRaters
        totalStars
      }
    `,
  });

  console.log(data);

  if (data && !currentVote) {
    cache.writeFragment({
      id: "Book:" + bookId,
      fragment: gql`
        fragment rate on Book {
          ratedBy
          totalRaters
          totalStars
        }
      `,
      data: {
        ratedBy: [...data.ratedBy, { userId, bookId, value }],
        totalRaters: data.totalRaters + 1,
        totalStars: data.totalStars + value,
      },
    });
  }

  if (data && currentVote) {
    const newArray = [...data.ratedBy];

    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i].userId === userId) {
        newArray[i] = { ...newArray[i], value };
        break;
      }
    }

    const newTotalStars = data.totalStars - currentVote + value;
    cache.writeFragment({
      id: "Book:" + bookId,
      fragment: gql`
        fragment rate2 on Book {
          ratedBy
          totalStars
        }
      `,
      data: {
        ratedBy: newArray,
        totalStars: newTotalStars,
      },
    });
  }
};

export const updateCacheAfterEdit = (
  plot: string,
  bookId: number,
  cache: ApolloCache<EditPlotMutation>
) => {
  cache.writeFragment({
    id: "Book:" + bookId,
    fragment: gql`
      fragment __ on Book {
        plot
      }
    `,
    data: {
      plot,
    },
  });
};

// update userbooks
export const updateCacheAfterBookmark = (
  userId: number,
  bookmarkStatus: boolean,
  bookId: number,
  cache: ApolloCache<RemoveBookmarkMutation | BookmarkMutation>
) => {
  // update on book first
  const newBookmarkRef = cache.writeFragment({
    id: "Book:" + bookId,
    fragment: gql`
      fragment status on Book {
        bookmarkStatus
      }
    `,
    data: {
      bookmarkStatus,
    },
  });

  const data = cache.readQuery<GetUserBooksQuery>({
    query: GetUserBooksDocument,
    variables: {
      getUserBooksId: userId,
    },
  });

  if (!data) return;

  if (!bookmarkStatus) {
    cache.modify({
      id: cache.identify(data.getUserBooks),
      fields: {
        bookmarks(existingBooks, { readField }) {
          return existingBooks.filter(
            (book) => readField("id", book) !== bookId
          );
        },
      },
    });
  } else {
    cache.modify({
      id: cache.identify(data.getUserBooks),
      fields: {
        bookmarks(existingBooks, { readField }) {
          return [...existingBooks, newBookmarkRef];
        },
      },
    });
  }
};

export const updateCacheAfterCreateBook = (
  userId: number,
  bookId: number,
  client: ApolloClient<object>
) => {
  const data = client.readQuery<GetUserBooksQuery>({
    query: GetUserBooksDocument,
    variables: {
      getUserBooksId: userId,
    },
  });

  if (!data) return;

  const newBook = client.cache.writeFragment({
    id: "Book:" + bookId,
    fragment: gql`
      fragment id on Book {
        id
      }
    `,
    data: {
      id: bookId,
    },
  });

  client.cache.modify({
    id: client.cache.identify(data.getUserBooks),
    fields: {
      booksAdded(existingBooks) {
        console.log(existingBooks);
        return [...existingBooks, newBook];
      },
    },
  });
};
