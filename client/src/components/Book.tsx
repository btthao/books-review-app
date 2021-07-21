import { Book as BookType } from "../generated/graphql";
import StarRatings from "react-star-ratings";
import BookmarkIcon from "@material-ui/icons/Bookmark";

interface BookBoxProps {
  title: string;
  author: string;
  rating: number;
  plotSnippet: string;
}

const Book: React.FC<BookBoxProps> = (props) => {
  const { title, author, rating, plotSnippet } = props;
  return (
    <div className="relative text-white bg-gray-700 rounded-md shadow b py-6 px-4 max-w-sm m-auto h-full w-full">
      <h1 className="text-lg text-teal-400">{title}</h1>
      <h3 className="">{author}</h3>
      <p>{plotSnippet}...</p>
      <StarRatings
        rating={rating + 3.5}
        starRatedColor="#2DD4BF"
        starWidthAndHeight="5px"
        // changeRating={this.changeRating}
        starDimension="16px"
        starSpacing="2px"
        numberOfStars={5}
        name="rating"
      />
      <div className="absolute top-1 right-4">
        <BookmarkIcon className="fill-current text-gray-300 " />
      </div>
    </div>
  );
};

export default Book;
