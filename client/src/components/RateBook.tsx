import { Form, Formik } from "formik";
import { useRateBookMutation } from "../generated/graphql";
import { updateCacheAfterVote } from "../utils/updateCache";
import Input from "./Input";

interface RateBookProps {
  bookId: number;
  userId: number;
  onClick: () => void;
  currentVote?: number;
}

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
          You previously gave this book {currentVote}{" "}
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
          <Form>
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
