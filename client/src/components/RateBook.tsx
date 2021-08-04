import { ApolloCache } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import React from "react";
import {
  RateBookMutation,
  Rating,
  useRateBookMutation,
} from "../generated/graphql";
import gql from "graphql-tag";
import Input from "./Input";
import { updateCacheAfterVote } from "../utils/updateCache";

interface RateBookProps {
  bookId: number;
  userId?: number;
  onClick: () => void;
  currentVote?: number;
}

// const updateCacheAfterVote = (
//   value: number,
//   userId: number,
//   bookId: number,
//   currentVote: number,
//   cache: ApolloCache<RateBookMutation>
// ) => {
//   if (currentVote && value == currentVote) return;

//   const data = cache.readFragment<{
//     ratedBy: Rating[];
//     totalRaters: number;
//     totalStars: number;
//   }>({
//     id: "Book:" + bookId,
//     fragment: gql`
//       fragment _ on Book {
//         ratedBy
//         totalRaters
//         totalStars
//       }
//     `,
//   });

//   if (data && !currentVote) {
//     cache.writeFragment({
//       id: "Book:" + bookId,
//       fragment: gql`
//         fragment __ on Book {
//           ratedBy
//           totalRaters
//           totalStars
//         }
//       `,
//       data: {
//         ratedBy: [...data.ratedBy, { userId, bookId, value }],
//         totalRaters: data.totalRaters + 1,
//         totalStars: data.totalStars + value,
//       },
//     });
//   }

//   if (data && currentVote) {
//     const newArray = [...data.ratedBy];

//     for (let i = 0; i < newArray.length; i++) {
//       if (newArray[i].userId === userId) {
//         newArray[i] = { ...newArray[i], value };
//         break;
//       }
//     }

//     const newTotalStars = data.totalStars - currentVote + value;
//     cache.writeFragment({
//       id: "Book:" + bookId,
//       fragment: gql`
//         fragment __ on Book {
//           ratedBy
//           totalStars
//         }
//       `,
//       data: {
//         ratedBy: newArray,
//         totalStars: newTotalStars,
//       },
//     });
//   }
// };

const RateBook: React.FC<RateBookProps> = ({
  bookId,
  userId,
  onClick,
  currentVote,
}) => {
  const [rateBook] = useRateBookMutation();
  const options = [1, 2, 3, 4, 5];
  return (
    <div>
      {currentVote && (
        <p className="text-gray-800">
          You previously gave this {currentVote}{" "}
          {currentVote > 1 ? "points" : "point"}.
        </p>
      )}
      <Formik
        initialValues={{
          rates: currentVote || 5,
        }}
        onSubmit={async (values) => {
          if (typeof values.rates == "string") {
            values.rates = parseInt(values.rates);
          }
          if (values.rates !== currentVote) {
            await rateBook({
              variables: { rateBookId: bookId, rateValue: values.rates },
              update: (cache) =>
                updateCacheAfterVote(
                  values.rates,
                  userId,
                  bookId,
                  currentVote,
                  cache
                ),
            });
          }
          onClick();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="">
            <Input
              name="rates"
              label="Honest opinion only :)"
              as="select"
              options={options}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gray-700 mt-3 rounded-sm py-0.5 px-1.5 text-rose-300 font-medium"
            >
              {currentVote ? "Change your rating" : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RateBook;
