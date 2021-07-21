import { Formik, Form } from "formik";
import React from "react";
import { useCreateBookMutation } from "../generated/graphql";
import { formErrors } from "../utils/formErrors";
import { yearList } from "../utils/yearList";
import Button from "./Button";
import Input from "./Input";

interface AddBookProps {
  onClick: () => void;
}

const AddBook: React.FC<AddBookProps> = ({ onClick }) => {
  const [createBook] = useCreateBookMutation();

  return (
    <div className=" w-full  p-4  ">
      <Formik
        initialValues={{
          title: "",
          author: "",
          plot: "",
          year: new Date().getFullYear(),
        }}
        onSubmit={async (values, { setErrors }) => {
          if (typeof values.year == "string") {
            values.year = parseInt(values.year, 10);
          }

          const response = await createBook({
            variables: { createBookInput: values },
            update: (cache) => {
              cache.evict({ fieldName: "getBooks:{}" });
            },
          });
          console.log(response);
          if (response.data?.createBook.book) {
            onClick();
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
                rounded
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBook;
