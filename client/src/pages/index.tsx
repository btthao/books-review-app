import Layout from "../components/Layout";
import Book from "../components/Book";
import Button from "../components/Button";
import NotExist from "../components/NotExist";
import { useGetBooksQuery } from "../generated/graphql";
import withApollo from "../utils/withApollo";
import { useState } from "react";
import Modal from "../components/Modal";
import AddBook from "../components/AddBook";

const Home: React.FC = () => {
  const fetchLimit = 12;
  const { data, error, loading, fetchMore } = useGetBooksQuery({
    variables: {
      getBooksLimit: fetchLimit,
    },
    notifyOnNetworkStatusChange: true,
  });
  const { books, moreBooks } = data?.getBooks || {};

  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <Layout>
      <div className="my-16 max-w-2xl w-10/12  m-auto grid items-center ">
        <p className="mb-6 text-lg text-center">
          Feel free to add a real book to this collection (ONLY IF YOU WANT AND
          HAVE ENERGY FOR). If not, some dummy data to test the app would also
          be appriciated! Plot summaries are taken from Wikipedia.
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
            }}
          />
        </Modal>
      )}

      {books?.length > 0 && (
        <div className="mb-20 grid items-center">
          <div className="my-10 px-4 md:px-10 xl:px-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {books.map((book) => (
              <Book key={book.id} {...book} />
            ))}
          </div>
          {moreBooks && (
            <Button
              className="text-sm border border-gray-500"
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
        <NotExist>
          {!error ? (
            <div>No books in our database. Please add a new one!</div>
          ) : (
            <div>{error.message}</div>
          )}
        </NotExist>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Home);
