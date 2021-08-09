import FavoriteIcon from "@material-ui/icons/Favorite";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Rating from "react-rating";
import Bookmark from "../../components/Bookmark";
import EditBook from "../../components/EditBook";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import NotExist from "../../components/NotExist";
import RateBook from "../../components/RateBook";
import RatingChart from "../../components/RatingChart";
import { useGetBookQuery, useMeQuery } from "../../generated/graphql";
import { generateData } from "../../utils/chartData";
import withApollo from "../../utils/withApollo";

const BookPage: React.FC = () => {
  const router = useRouter();
  const [showPoster, setShowPoster] = useState<JSX.Element>(null);
  const bookId =
    typeof router.query.id == "string" ? parseInt(router.query.id) : -404;
  const { data: MeData, loading: MeLoading } = useMeQuery();
  const [showModal, setShowModal] = useState<boolean>(false);

  const { data, loading } = useGetBookQuery({
    variables: {
      getBookId: bookId,
    },
  });

  const {
    author,
    id,
    plot,
    poster,
    title,
    year,
    totalRaters,
    totalStars,
    bookmarkStatus,
  } = data?.getBook || {};

  const { data: dataArray, voteStatus } = generateData(
    data?.getBook?.ratedBy,
    MeData?.me?.id
  );

  useEffect(() => {
    if (!MeLoading && poster) {
      if (MeData?.me?.id == poster.id) {
        setShowPoster(
          <p className="text-gray-500 font-medium">You added this book</p>
        );
      } else {
        setShowPoster(
          <p className="text-gray-500 font-medium">
            Added by{" "}
            <span className="font-bold underline">
              <NextLink href="/user/[id]" as={`/user/${poster.id}`}>
                {poster.username}
              </NextLink>
            </span>
          </p>
        );
      }
    }
  }, [MeData, MeLoading, poster]);

  if (loading || MeLoading) return null;

  return (
    <Layout>
      {!data?.getBook ? (
        <NotExist>
          <div>
            Oops! Looks like this book doesn&apos;t exist or has been deleted.
          </div>
        </NotExist>
      ) : (
        <div className="relative py-4 px-6 w-full max-w-3xl m-auto">
          {/* general info */}

          <h1 className="font-bold text-3xl my-2 text-rose-300 ">
            <span className="mr-2">{title}</span>
            <Bookmark bookId={id} bookmarkStatus={bookmarkStatus} />
          </h1>

          <h3 className="mb-1 font-semibold text-lg text-teal-400">
            By {author} - {year}
          </h3>

          {showPoster}

          <p className="my-2 text-white">{plot}</p>

          {MeData?.me?.id == poster?.id && (
            <EditBook id={id} currentPlot={plot} />
          )}

          <button
            className="mt-10 sm:hover:underline text-rose-300 font-semibold"
            onClick={() => setShowModal(true)}
          >
            Rate book
          </button>

          {showModal && (
            <Modal onClick={() => setShowModal(false)}>
              <RateBook
                bookId={id}
                userId={MeData?.me?.id}
                onClick={() => setShowModal(false)}
                currentVote={voteStatus}
              />
            </Modal>
          )}

          <small className="block text-sm text-teal-400 mt-5 mb-1">
            {totalRaters > 0
              ? `Average points based on ${totalRaters} ratings`
              : "No ratings yet"}
          </small>

          <Rating
            emptySymbol={
              <FavoriteIcon className="text-gray-300 text-xl mr-1" />
            }
            fullSymbol={<FavoriteIcon className="text-red-300 text-xl mr-1" />}
            readonly={true}
            fractions={10}
            quiet={true}
            initialRating={parseFloat((totalStars / totalRaters).toFixed(1))}
          />

          {totalRaters > 0 && (
            <div className="w-full max-w-sm mt-6">
              <RatingChart data={dataArray} />
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: true })(BookPage);
