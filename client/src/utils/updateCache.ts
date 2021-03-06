import { ApolloCache, ApolloClient } from "@apollo/client";
import gql from "graphql-tag";
import {
  Book,
  BookmarkMutation,
  EditPlotMutation,
  GetUserBooksDocument,
  GetUserBooksQuery,
  RateBookMutation,
  Rating,
  RemoveBookmarkMutation,
} from "../generated/graphql";

export const updateCacheAfterVote = (
  value: number,
  userId: number,
  bookId: number,
  currentVote: number,
  cache: ApolloCache<RateBookMutation>
): void => {
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
): void => {
  cache.writeFragment({
    id: "Book:" + bookId,
    fragment: gql`
      fragment plot on Book {
        plot
      }
    `,
    data: {
      plot,
    },
  });
};

export const updateCacheAfterBookmark = (
  userId: number,
  bookmarkStatus: boolean,
  bookId: number,
  cache: ApolloCache<RemoveBookmarkMutation | BookmarkMutation>
): void => {
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
            (book: Book) => readField("id", book) !== bookId
          );
        },
      },
    });
  } else {
    cache.modify({
      id: cache.identify(data.getUserBooks),
      fields: {
        bookmarks(existingBooks) {
          return [...existingBooks, newBookmarkRef];
        },
      },
    });
  }
};

export const updateCacheAfterCreateBook = (
  userId: number,
  bookId: number,
  // eslint-disable-next-line @typescript-eslint/ban-types
  client: ApolloClient<object>
): void => {
  const data = client.readQuery<GetUserBooksQuery>({
    query: GetUserBooksDocument,
    variables: {
      getUserBooksId: userId,
    },
  });

  if (!data) return;

  const newBookRef = client.cache.writeFragment({
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
      booksAdded(existingBooksRef) {
        return [...existingBooksRef, newBookRef];
      },
    },
  });
};
