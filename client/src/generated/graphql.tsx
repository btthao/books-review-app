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
  rating: Scalars['Int'];
  poster: User;
  plotSnippet: Scalars['String'];
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
  book?: Maybe<Scalars['Boolean']>;
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
  createBook: BookReturn;
  editPlot: Book;
  deleteBook: Scalars['Boolean'];
  registerUser: LoginRegisterResponse;
  loginUser: LoginRegisterResponse;
  logout: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
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
  getUser?: Maybe<User>;
};


export type QueryGetBooksArgs = {
  cursor?: Maybe<Scalars['Int']>;
};


export type QueryGetBookArgs = {
  id: Scalars['Int'];
};


export type QueryGetUserArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  createdAt: Scalars['String'];
};

export type BookDataFragment = (
  { __typename?: 'Book' }
  & Pick<Book, 'id' | 'title' | 'author' | 'plot' | 'year' | 'rating'>
);

export type ErrorInfoFragment = (
  { __typename?: 'Error' }
  & Pick<Error, 'field' | 'message'>
);

export type UserDataFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'createdAt'>
);

export type CreateBookMutationVariables = Exact<{
  createBookInput: BookInput;
}>;


export type CreateBookMutation = (
  { __typename?: 'Mutation' }
  & { createBook: (
    { __typename?: 'BookReturn' }
    & Pick<BookReturn, 'book'>
    & { errors?: Maybe<Array<(
      { __typename?: 'Error' }
      & ErrorInfoFragment
    )>> }
  ) }
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

export type GetBooksQueryVariables = Exact<{
  getBooksCursor?: Maybe<Scalars['Int']>;
}>;


export type GetBooksQuery = (
  { __typename?: 'Query' }
  & { getBooks: (
    { __typename?: 'Pagination' }
    & Pick<Pagination, 'moreBooks'>
    & { books?: Maybe<Array<(
      { __typename?: 'Book' }
      & Pick<Book, 'id' | 'title' | 'author' | 'plotSnippet' | 'rating'>
    )>> }
  ) }
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
  title
  author
  plot
  year
  rating
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
  createdAt
}
    `;
export const CreateBookDocument = gql`
    mutation CreateBook($createBookInput: BookInput!) {
  createBook(input: $createBookInput) {
    errors {
      ...ErrorInfo
    }
    book
  }
}
    ${ErrorInfoFragmentDoc}`;
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
export const GetBooksDocument = gql`
    query GetBooks($getBooksCursor: Int) {
  getBooks(cursor: $getBooksCursor) {
    books {
      id
      title
      author
      plotSnippet
      rating
    }
    moreBooks
  }
}
    `;

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
 *      getBooksCursor: // value for 'getBooksCursor'
 *   },
 * });
 */
export function useGetBooksQuery(baseOptions?: Apollo.QueryHookOptions<GetBooksQuery, GetBooksQueryVariables>) {
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