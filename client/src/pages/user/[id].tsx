import { useRouter } from "next/router";
import React, { useState } from "react";
import Book from "../../components/Book";
import Layout from "../../components/Layout";
import { useGetUserBooksQuery, useMeQuery } from "../../generated/graphql";
import withApollo from "../../utils/withApollo";

interface UserPageProps {}

const UserPage: React.FC<UserPageProps> = ({}) => {
  const router = useRouter();
  const userId =
    typeof router.query.id == "string" ? parseInt(router.query.id) : -1;
  const [list, setList] = useState(1);
  const { data, loading } = useGetUserBooksQuery({
    variables: {
      getUserBooksId: userId,
    },
  });

  //console.log(data);

  // if (loading) {
  //   return null;
  // }

  return (
    <Layout>
      {!data?.getUserBooks ? (
        <div className=" my-10">
          <p className="text-center text-lg font-bold text-rose-500">
            Oops! Looks like the user with this Id doesn't exist
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-center mt-10 mb-3 font-bold text-3xl sm:text-4xl text-teal-300">
            {data?.getUserBooks?.username}'s List
          </h1>
          <div className="m-auto sm:text-lg font-bold text-rose-300  w-max grid sm:grid-cols-2 gap-1 sm:gap-5 ">
            <button
              className={` ${list == 1 ? "font-bold underline" : ""} `}
              onClick={() => setList(1)}
            >
              Books Added
            </button>
            <button
              className={` ${list == 2 ? "font-bold underline" : ""} `}
              onClick={() => setList(2)}
            >
              Bookmarked List
            </button>
          </div>
          <div className="my-10 px-4 md:px-10 xl:px-20 ">
            {list == 1 &&
              (data?.getUserBooks?.booksAdded?.length == 0 ? (
                <h1 className="text-center font-medium">
                  No books in this list.
                </h1>
              ) : (
                <div className="w-full grid gap-6  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr ">
                  {data?.getUserBooks?.booksAdded?.map((book) => (
                    <Book key={book.id} {...book} />
                  ))}
                </div>
              ))}
            {list == 2 &&
              (data?.getUserBooks?.bookmarks?.length == 0 ? (
                <h1 className="text-center font-medium">
                  No books in this list.
                </h1>
              ) : (
                <div className="w-full grid gap-6  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr ">
                  {data?.getUserBooks?.bookmarks?.map((book) => (
                    <Book key={book.id} {...book} />
                  ))}
                </div>
              ))}
          </div>
        </>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: true })(UserPage);
