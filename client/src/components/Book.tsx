import Rating from "react-rating";
import NextLink from "next/link";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { BookDataFragment } from "../generated/graphql";
import Bookmark from "./Bookmark";

const Book: React.FC<BookDataFragment> = (props) => {
  const { author, title, plot, id, totalRaters, totalStars, bookmarkStatus } =
    props;

  return (
    <div className="relative bg-lightgray border border-gray-700  rounded-md shadow-md pt-8 px-4 max-w-sm m-auto w-full h-60">
      <NextLink href="/book/[id]" as={`/book/${id}`}>
        <h1 className="text-xl cursor-pointer text-rose-300 line-clamp-1 hover:text-rose-400 ">
          {title}
        </h1>
      </NextLink>
      <h3 className="font-semibold text-lg my-1 line-clamp-1 text-teal-600">
        {author}
      </h3>
      <p className="mb-2 line-clamp-3">{plot}</p>
      <Rating
        emptySymbol={<FavoriteIcon className="text-gray-500 text-lg mr-1" />}
        fullSymbol={<FavoriteIcon className="text-teal-500 text-lg mr-1" />}
        readonly={true}
        fractions={10}
        quiet={true}
        initialRating={parseFloat((totalStars / totalRaters).toFixed(1))}
      />
      <div className="absolute top-2 right-4">
        <Bookmark bookId={id} bookmarkStatus={bookmarkStatus} />
      </div>
    </div>
  );
};

export default Book;
