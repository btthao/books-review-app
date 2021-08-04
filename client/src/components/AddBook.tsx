import { Formik, Form } from "formik";
import React from "react";
import {
  useCreateBookMutation,
  useMeQuery,
  GetUserBooksQuery,
} from "../generated/graphql";
import { formErrors } from "../utils/formErrors";
import { updateCacheAfterCreateBook } from "../utils/updateCache";
import { yearList } from "../utils/yearList";
import Button from "./Button";
import Input from "./Input";
import { apolloClient } from "../utils/withApollo";
import { useApolloClient } from "@apollo/client";
interface AddBookProps {
  onClick: () => void;
}

const AddBook: React.FC<AddBookProps> = ({ onClick }) => {
  const [createBook] = useCreateBookMutation();
  const { data, loading } = useMeQuery();
  const client = useApolloClient();
  return (
    <div className=" w-full  p-4  ">
      <Formik
        initialValues={{
          title: "",
          author: "",
          plot: "",
          year: new Date().getFullYear(),
        }}
        validate={(values) => {
          const errors: { title?: string; author?: string; plot?: string } = {};

          for (const field in values) {
            if (typeof values[field] === "string") {
              if (values[field].trim().length == 0) {
                errors[field] = "This field can't be empty.";
              }
            }
          }

          if (values.plot.length > 255) {
            errors.plot = "This field shouldn't be longer than 255 characters.";
          }

          return errors;
        }}
        onSubmit={async (values, { setErrors }) => {
          for (const field in values) {
            if (typeof values[field] == "string") {
              values[field] = values[field].trim();
            }
          }

          if (typeof values.year == "string") {
            values.year = parseInt(values.year, 10);
          }

          const response = await createBook({
            variables: { createBookInput: values },
            update: (cache) => {
              cache.evict({ fieldName: "getBooks:{}" });
            },
          });

          if (response.data?.createBook.book) {
            onClick();
            updateCacheAfterCreateBook(
              data?.me?.id,
              response.data?.createBook.book.id,
              client
            );
          } else if (response.data?.createBook.errors) {
            setErrors(formErrors(response.data.createBook.errors));
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="">
            <Input name="title" placeholder="Book title" />
            <Input name="author" placeholder="Author" />
            <Input name="plot" placeholder="Tell us something" as="textarea" />
            <Input
              name="year"
              label="Publication year"
              as="select"
              options={yearList}
            />
            <div className="mt-6  m-auto">
              <Button
                type="submit"
                disabled={isSubmitting}
                text="Add Book"
                className="bg-teal-400"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBook;
