import Layout from "../components/Layout";
import Book from "../components/Book";
import Button from "../components/Button";
import { useGetBooksQuery } from "../generated/graphql";
import withApollo from "../utils/withApollo";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";

const Home: React.FC = ({}) => {
  const { data, error, fetchMore } = useGetBooksQuery({
    notifyOnNetworkStatusChange: true,
  });
  console.log(useGetBooksQuery());
  const [books, setBooks] = useState([]);
  const [moreBooks, setMoreBooks] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    setBooks(data?.getBooks.books);
    setMoreBooks(data?.getBooks.moreBooks);
  }, [data]);

  return (
    <Layout>
      <div className="my-12 max-w-2xl w-10/12  m-auto py-8 px-4">
        <p className="mb-6 text-lg">
          Here are some of my favorite books. While this is mostly a dev
          project, feel free to add a real book to this collection (ONLY IF YOU
          WANT AND HAVE ENERGY). If not, some dummy data to test the app would
          also be appriciated :)
        </p>
        <Button
          text="Add new book"
          width="auto"
          onClick={() => setShowModal(true)}
        />
      </div>

      {showModal && <Modal onClick={() => setShowModal(false)} />}

      {books ? (
        <>
          <div className="my-10 px-4 md:px-10 xl:px-20 grid gap-6  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
            {books.map((book) => (
              <Book key={book.id} {...book} />
            ))}
          </div>
          {moreBooks && (
            <button
              onClick={() => {
                fetchMore({
                  variables: {
                    getBooksCursor: books[books.length - 1].id,
                  },
                });
              }}
            >
              Load more
            </button>
          )}
        </>
      ) : (
        <div>
          <div>No data or query failed</div>
          <div>{error?.message}</div>
        </div>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Home);
