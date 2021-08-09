import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Book = {
  __typename?: 'Book';
  id: Scalars['Int'];
  title: Scalars['String'];
  author: Scalars['String'];
  plot: Scalars['String'];
  year: Scalars['Int'];
  totalRaters: Scalars['Int'];
  totalStars: Scalars['Int'];
  ratedBy?: Maybe<Array<Rating>>;
  bookmarkedBy?: Maybe<Array<User>>;
  poster: User;
  bookmarkStatus?: Maybe<Scalars['Boolean']>;
};

export type BookInput = {
  title: Scalars['String'];
  author: Scalars['String'];
  plot: Scalars['String'];
  year: Scalars['Float'];
};

export type BookReturn = {
  __typename?: 'BookReturn';
  errors?: Maybe<Array<Error>>;
  book?: Maybe<Book>;
};

export type Error = {
  __typename?: 'Error';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginRegisterInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type LoginRegisterResponse = {
  __typename?: 'LoginRegisterResponse';
  errors?: Maybe<Array<Error>>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  rate: Scalars['Boolean'];
  createBook: BookReturn;
  editPlot: Scalars['Boolean'];
  deleteBook: Scalars['Boolean'];
  bookmark: Scalars['Boolean'];
  removeBookmark: Scalars['Boolean'];
  registerUser: LoginRegisterResponse;
  loginUser: LoginRegisterResponse;
  logout: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
};


export type MutationRateArgs = {
  value: Scalars['Int'];
  bookId: Scalars['Int'];
};


export type MutationCreateBookArgs = {
  input: BookInput;
};


export type MutationEditPlotArgs = {
  plot: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteBookArgs = {
  id: Scalars['Int'];
};


export type MutationBookmarkArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveBookmarkArgs = {
  id: Scalars['Int'];
};


export type MutationRegisterUserArgs = {
  input: LoginRegisterInput;
};


export type MutationLoginUserArgs = {
  input: LoginRegisterInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};

export type Pagination = {
  __typename?: 'Pagination';
  books?: Maybe<Array<Book>>;
  moreBooks: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  getBooks: Pagination;
  getBook?: Maybe<Book>;
  me?: Maybe<User>;
  getUserBooks?: Maybe<User>;
};


export type QueryGetBooksArgs = {
  cursor?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryGetBookArgs = {
  id: Scalars['Int'];
};


export type QueryGetUserBooksArgs = {
  id: Scalars['Int'];
};

export type Rating = {
  __typename?: 'Rating';
  value: Scalars['Int'];
  userId: Scalars['Int'];
  bookId: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  booksAdded?: Maybe<Array<Book>>;
  bookmarks?: Maybe<Array<Book>>;
  createdAt: Scalars['String'];
};

export type BookDataFragment = (
  { __typename?: 'Book' }
  & Pick<Book, 'id' | 'author' | 'totalRaters' | 'totalStars' | 'plot' | 'title' | 'bookmarkStatus'>
);

export type ErrorInfoFragment = (
  { __typename?: 'Error' }
  & Pick<Error, 'field' | 'message'>
);

export type UserDataFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type BookmarkMutationVariables = Exact<{
  bookmarkId: Scalars['Int'];
}>;


export type BookmarkMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'bookmark'>
);

export type CreateBookMutationVariables = Exact<{
  createBookInput: BookInput;
}>;


export type CreateBookMutation = (
  { __typename?: 'Mutation' }
  & { createBook: (
    { __typename?: 'BookReturn' }
    & { errors?: Maybe<Array<(
      { __typename?: 'Error' }
      & ErrorInfoFragment
    )>>, book?: Maybe<(
      { __typename?: 'Book' }
      & BookDataFragment
    )> }
  ) }
);

export type DeleteBookMutationVariables = Exact<{
  deleteBookId: Scalars['Int'];
}>;


export type DeleteBookMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteBook'>
);

export type EditPlotMutationVariables = Exact<{
  editPlotPlot: Scalars['String'];
  editPlotId: Scalars['Int'];
}>;


export type EditPlotMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'editPlot'>
);

export type LoginMutationVariables = Exact<{
  loginUserInput: LoginRegisterInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { loginUser: (
    { __typename?: 'LoginRegisterResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'Error' }
      & ErrorInfoFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & UserDataFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RateBookMutationVariables = Exact<{
  rateValue: Scalars['Int'];
  rateBookId: Scalars['Int'];
}>;


export type RateBookMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'rate'>
);

export type RegisterUserMutationVariables = Exact<{
  registerUserInput: LoginRegisterInput;
}>;


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & { registerUser: (
    { __typename?: 'LoginRegisterResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'Error' }
      & ErrorInfoFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & UserDataFragment
    )> }
  ) }
);

export type RemoveBookmarkMutationVariables = Exact<{
  removeBookmarkId: Scalars['Int'];
}>;


export type RemoveBookmarkMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeBookmark'>
);

export type GetBookQueryVariables = Exact<{
  getBookId: Scalars['Int'];
}>;


export type GetBookQuery = (
  { __typename?: 'Query' }
  & { getBook?: Maybe<(
    { __typename?: 'Book' }
    & Pick<Book, 'id' | 'title' | 'author' | 'plot' | 'year' | 'totalRaters' | 'totalStars' | 'bookmarkStatus'>
    & { ratedBy?: Maybe<Array<(
      { __typename?: 'Rating' }
      & Pick<Rating, 'value' | 'userId' | 'bookId'>
    )>>, poster: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id'>
    ) }
  )> }
);

export type GetBooksQueryVariables = Exact<{
  getBooksLimit: Scalars['Int'];
  getBooksCursor?: Maybe<Scalars['Int']>;
}>;


export type GetBooksQuery = (
  { __typename?: 'Query' }
  & { getBooks: (
    { __typename?: 'Pagination' }
    & Pick<Pagination, 'moreBooks'>
    & { books?: Maybe<Array<(
      { __typename?: 'Book' }
      & BookDataFragment
    )>> }
  ) }
);

export type GetUserBooksQueryVariables = Exact<{
  getUserBooksId: Scalars['Int'];
}>;


export type GetUserBooksQuery = (
  { __typename?: 'Query' }
  & { getUserBooks?: Maybe<(
    { __typename?: 'User' }
    & { booksAdded?: Maybe<Array<(
      { __typename?: 'Book' }
      & BookDataFragment
    )>>, bookmarks?: Maybe<Array<(
      { __typename?: 'Book' }
      & BookDataFragment
    )>> }
    & UserDataFragment
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserDataFragment
  )> }
);

export const BookDataFragmentDoc = gql`
    fragment BookData on Book {
  id
  author
  totalRaters
  totalStars
  plot
  title
  bookmarkStatus
}
    `;
export const ErrorInfoFragmentDoc = gql`
    fragment ErrorInfo on Error {
  field
  message
}
    `;
export const UserDataFragmentDoc = gql`
    fragment UserData on User {
  id
  username
}
    `;
export const BookmarkDocument = gql`
    mutation Bookmark($bookmarkId: Int!) {
  bookmark(id: $bookmarkId)
}
    `;
export type BookmarkMutationFn = Apollo.MutationFunction<BookmarkMutation, BookmarkMutationVariables>;

/**
 * __useBookmarkMutation__
 *
 * To run a mutation, you first call `useBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookmarkMutation, { data, loading, error }] = useBookmarkMutation({
 *   variables: {
 *      bookmarkId: // value for 'bookmarkId'
 *   },
 * });
 */
export function useBookmarkMutation(baseOptions?: Apollo.MutationHookOptions<BookmarkMutation, BookmarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BookmarkMutation, BookmarkMutationVariables>(BookmarkDocument, options);
      }
export type BookmarkMutationHookResult = ReturnType<typeof useBookmarkMutation>;
export type BookmarkMutationResult = Apollo.MutationResult<BookmarkMutation>;
export type BookmarkMutationOptions = Apollo.BaseMutationOptions<BookmarkMutation, BookmarkMutationVariables>;
export const CreateBookDocument = gql`
    mutation CreateBook($createBookInput: BookInput!) {
  createBook(input: $createBookInput) {
    errors {
      ...ErrorInfo
    }
    book {
      ...BookData
    }
  }
}
    ${ErrorInfoFragmentDoc}
${BookDataFragmentDoc}`;
export type CreateBookMutationFn = Apollo.MutationFunction<CreateBookMutation, CreateBookMutationVariables>;

/**
 * __useCreateBookMutation__
 *
 * To run a mutation, you first call `useCreateBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookMutation, { data, loading, error }] = useCreateBookMutation({
 *   variables: {
 *      createBookInput: // value for 'createBookInput'
 *   },
 * });
 */
export function useCreateBookMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookMutation, CreateBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookMutation, CreateBookMutationVariables>(CreateBookDocument, options);
      }
export type CreateBookMutationHookResult = ReturnType<typeof useCreateBookMutation>;
export type CreateBookMutationResult = Apollo.MutationResult<CreateBookMutation>;
export type CreateBookMutationOptions = Apollo.BaseMutationOptions<CreateBookMutation, CreateBookMutationVariables>;
export const DeleteBookDocument = gql`
    mutation DeleteBook($deleteBookId: Int!) {
  deleteBook(id: $deleteBookId)
}
    `;
export type DeleteBookMutationFn = Apollo.MutationFunction<DeleteBookMutation, DeleteBookMutationVariables>;

/**
 * __useDeleteBookMutation__
 *
 * To run a mutation, you first call `useDeleteBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBookMutation, { data, loading, error }] = useDeleteBookMutation({
 *   variables: {
 *      deleteBookId: // value for 'deleteBookId'
 *   },
 * });
 */
export function useDeleteBookMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBookMutation, DeleteBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBookMutation, DeleteBookMutationVariables>(DeleteBookDocument, options);
      }
export type DeleteBookMutationHookResult = ReturnType<typeof useDeleteBookMutation>;
export type DeleteBookMutationResult = Apollo.MutationResult<DeleteBookMutation>;
export type DeleteBookMutationOptions = Apollo.BaseMutationOptions<DeleteBookMutation, DeleteBookMutationVariables>;
export const EditPlotDocument = gql`
    mutation EditPlot($editPlotPlot: String!, $editPlotId: Int!) {
  editPlot(plot: $editPlotPlot, id: $editPlotId)
}
    `;
export type EditPlotMutationFn = Apollo.MutationFunction<EditPlotMutation, EditPlotMutationVariables>;

/**
 * __useEditPlotMutation__
 *
 * To run a mutation, you first call `useEditPlotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPlotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPlotMutation, { data, loading, error }] = useEditPlotMutation({
 *   variables: {
 *      editPlotPlot: // value for 'editPlotPlot'
 *      editPlotId: // value for 'editPlotId'
 *   },
 * });
 */
export function useEditPlotMutation(baseOptions?: Apollo.MutationHookOptions<EditPlotMutation, EditPlotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditPlotMutation, EditPlotMutationVariables>(EditPlotDocument, options);
      }
export type EditPlotMutationHookResult = ReturnType<typeof useEditPlotMutation>;
export type EditPlotMutationResult = Apollo.MutationResult<EditPlotMutation>;
export type EditPlotMutationOptions = Apollo.BaseMutationOptions<EditPlotMutation, EditPlotMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginUserInput: LoginRegisterInput!) {
  loginUser(input: $loginUserInput) {
    errors {
      ...ErrorInfo
    }
    user {
      ...UserData
    }
  }
}
    ${ErrorInfoFragmentDoc}
${UserDataFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginUserInput: // value for 'loginUserInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RateBookDocument = gql`
    mutation RateBook($rateValue: Int!, $rateBookId: Int!) {
  rate(value: $rateValue, bookId: $rateBookId)
}
    `;
export type RateBookMutationFn = Apollo.MutationFunction<RateBookMutation, RateBookMutationVariables>;

/**
 * __useRateBookMutation__
 *
 * To run a mutation, you first call `useRateBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRateBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rateBookMutation, { data, loading, error }] = useRateBookMutation({
 *   variables: {
 *      rateValue: // value for 'rateValue'
 *      rateBookId: // value for 'rateBookId'
 *   },
 * });
 */
export function useRateBookMutation(baseOptions?: Apollo.MutationHookOptions<RateBookMutation, RateBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RateBookMutation, RateBookMutationVariables>(RateBookDocument, options);
      }
export type RateBookMutationHookResult = ReturnType<typeof useRateBookMutation>;
export type RateBookMutationResult = Apollo.MutationResult<RateBookMutation>;
export type RateBookMutationOptions = Apollo.BaseMutationOptions<RateBookMutation, RateBookMutationVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($registerUserInput: LoginRegisterInput!) {
  registerUser(input: $registerUserInput) {
    errors {
      ...ErrorInfo
    }
    user {
      ...UserData
    }
  }
}
    ${ErrorInfoFragmentDoc}
${UserDataFragmentDoc}`;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      registerUserInput: // value for 'registerUserInput'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const RemoveBookmarkDocument = gql`
    mutation RemoveBookmark($removeBookmarkId: Int!) {
  removeBookmark(id: $removeBookmarkId)
}
    `;
export type RemoveBookmarkMutationFn = Apollo.MutationFunction<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>;

/**
 * __useRemoveBookmarkMutation__
 *
 * To run a mutation, you first call `useRemoveBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeBookmarkMutation, { data, loading, error }] = useRemoveBookmarkMutation({
 *   variables: {
 *      removeBookmarkId: // value for 'removeBookmarkId'
 *   },
 * });
 */
export function useRemoveBookmarkMutation(baseOptions?: Apollo.MutationHookOptions<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>(RemoveBookmarkDocument, options);
      }
export type RemoveBookmarkMutationHookResult = ReturnType<typeof useRemoveBookmarkMutation>;
export type RemoveBookmarkMutationResult = Apollo.MutationResult<RemoveBookmarkMutation>;
export type RemoveBookmarkMutationOptions = Apollo.BaseMutationOptions<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>;
export const GetBookDocument = gql`
    query GetBook($getBookId: Int!) {
  getBook(id: $getBookId) {
    id
    title
    author
    plot
    year
    totalRaters
    totalStars
    bookmarkStatus
    ratedBy {
      value
      userId
      bookId
    }
    poster {
      username
      id
    }
  }
}
    `;

/**
 * __useGetBookQuery__
 *
 * To run a query within a React component, call `useGetBookQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookQuery({
 *   variables: {
 *      getBookId: // value for 'getBookId'
 *   },
 * });
 */
export function useGetBookQuery(baseOptions: Apollo.QueryHookOptions<GetBookQuery, GetBookQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBookQuery, GetBookQueryVariables>(GetBookDocument, options);
      }
export function useGetBookLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookQuery, GetBookQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBookQuery, GetBookQueryVariables>(GetBookDocument, options);
        }
export type GetBookQueryHookResult = ReturnType<typeof useGetBookQuery>;
export type GetBookLazyQueryHookResult = ReturnType<typeof useGetBookLazyQuery>;
export type GetBookQueryResult = Apollo.QueryResult<GetBookQuery, GetBookQueryVariables>;
export const GetBooksDocument = gql`
    query GetBooks($getBooksLimit: Int!, $getBooksCursor: Int) {
  getBooks(limit: $getBooksLimit, cursor: $getBooksCursor) {
    books {
      ...BookData
    }
    moreBooks
  }
}
    ${BookDataFragmentDoc}`;

/**
 * __useGetBooksQuery__
 *
 * To run a query within a React component, call `useGetBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBooksQuery({
 *   variables: {
 *      getBooksLimit: // value for 'getBooksLimit'
 *      getBooksCursor: // value for 'getBooksCursor'
 *   },
 * });
 */
export function useGetBooksQuery(baseOptions: Apollo.QueryHookOptions<GetBooksQuery, GetBooksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBooksQuery, GetBooksQueryVariables>(GetBooksDocument, options);
      }
export function useGetBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBooksQuery, GetBooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBooksQuery, GetBooksQueryVariables>(GetBooksDocument, options);
        }
export type GetBooksQueryHookResult = ReturnType<typeof useGetBooksQuery>;
export type GetBooksLazyQueryHookResult = ReturnType<typeof useGetBooksLazyQuery>;
export type GetBooksQueryResult = Apollo.QueryResult<GetBooksQuery, GetBooksQueryVariables>;
export const GetUserBooksDocument = gql`
    query GetUserBooks($getUserBooksId: Int!) {
  getUserBooks(id: $getUserBooksId) {
    ...UserData
    booksAdded {
      ...BookData
    }
    bookmarks {
      ...BookData
    }
  }
}
    ${UserDataFragmentDoc}
${BookDataFragmentDoc}`;

/**
 * __useGetUserBooksQuery__
 *
 * To run a query within a React component, call `useGetUserBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserBooksQuery({
 *   variables: {
 *      getUserBooksId: // value for 'getUserBooksId'
 *   },
 * });
 */
export function useGetUserBooksQuery(baseOptions: Apollo.QueryHookOptions<GetUserBooksQuery, GetUserBooksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserBooksQuery, GetUserBooksQueryVariables>(GetUserBooksDocument, options);
      }
export function useGetUserBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserBooksQuery, GetUserBooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserBooksQuery, GetUserBooksQueryVariables>(GetUserBooksDocument, options);
        }
export type GetUserBooksQueryHookResult = ReturnType<typeof useGetUserBooksQuery>;
export type GetUserBooksLazyQueryHookResult = ReturnType<typeof useGetUserBooksLazyQuery>;
export type GetUserBooksQueryResult = Apollo.QueryResult<GetUserBooksQuery, GetUserBooksQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...UserData
  }
}
    ${UserDataFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;