import Layout from "../components/Layout";
import Book from "../components/Book";
import Button from "../components/Button";
import { useGetBooksQuery } from "../generated/graphql";
import withApollo from "../utils/withApollo";
import { useState } from "react";
import Modal from "../components/Modal";
import NextLink from "next/link";
import AddBook from "../components/AddBook";

const Home: React.FC = () => {
  const fetchLimit: number = 12;
  const { data, error, loading, fetchMore, refetch } = useGetBooksQuery({
    variables: {
      getBooksLimit: fetchLimit,
    },
    notifyOnNetworkStatusChange: true,
  });
  const { books, moreBooks } = data?.getBooks || {};

  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <Layout>
      <div className="my-12 max-w-2xl w-10/12  m-auto py-8 px-4  brightness-90 grid items-center ">
        <p className="mb-6 text-lg text-center">
          Feel free to add a real book to this collection (ONLY IF YOU WANT AND
          HAVE ENERGY FOR). If not, some dummy data to test the app would also
          be appriciated :) Plot summaries are taken from Wikipedia.
        </p>
        <Button
          text="Add new book"
          className="border border-rose-300"
          onClick={() => setShowModal(true)}
        />
      </div>

      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <AddBook
            onClick={() => {
              setShowModal(false);
              refetch({
                getBooksLimit: moreBooks ? books.length : books.length + 1,
              });
            }}
          />
        </Modal>
      )}
      {books?.length > 0 && (
        <div className="mb-20 grid items-center">
          <div className="my-10 px-4 md:px-10 xl:px-20 grid gap-6  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
            {books.map((book) => (
              <Book key={book.id} {...book} />
            ))}
          </div>
          {moreBooks && (
            <Button
              className="text-sm"
              text="See more"
              onClick={() => {
                fetchMore({
                  variables: {
                    getBooksLimit: fetchLimit,
                    getBooksCursor: books[books.length - 1].id,
                  },
                });
              }}
            />
          )}
        </div>
      )}
      {!loading && books?.length == 0 && (
        <div className="text-center text-md border-gray-600 text-rose-300 border m-auto w-max p-4">
          {!error && <div>No books in our database. Please add a new one!</div>}
          <div>{error?.message}</div>
        </div>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Home);
