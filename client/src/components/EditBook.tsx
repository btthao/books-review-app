import React, { useState } from "react";
import {
  useDeleteBookMutation,
  useEditPlotMutation,
} from "../generated/graphql";
import { useRouter } from "next/router";
import Modal from "./Modal";
import { Formik, Form } from "formik";
import Input from "./Input";
import { updateCacheAfterEdit } from "../utils/updateCache";

interface EditBookProps {
  id: number;
  currentPlot: string;
}

const EditBook: React.FC<EditBookProps> = ({ id, currentPlot }) => {
  const router = useRouter();
  const [deleteBook] = useDeleteBookMutation();
  const [editPlot] = useEditPlotMutation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

  const editModal = (
    <Formik
      initialValues={{
        plot: currentPlot,
      }}
      validate={(values) => {
        const errors = {};
        for (const field in values) {
          if (values[field].trim().length == 0) {
            errors[field] = "This field can't be empty.";
          }
        }
        return errors;
      }}
      onSubmit={async (values) => {
        for (const field in values) {
          if (typeof values[field] == "string") {
            values[field] = values[field].trim();
          }
        }
        await editPlot({
          variables: {
            editPlotId: id,
            editPlotPlot: values.plot,
          },
          update: (cache) => {
            updateCacheAfterEdit(values.plot, id, cache);
          },
        });
        setShowModal(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Input name="plot" label="Change plot details" as="textarea" />

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gray-700 mt-3 rounded-sm py-0.5 px-1.5 text-rose-300 font-medium"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );

  const deleteModal = (
    <div className="text-gray-800 text-center">
      <p>Are you sure you want to delete this book?</p>
      <button
        className="mt-3 bg-gray-700 rounded-md text-rose-300 px-2"
        onClick={async () => {
          await deleteBook({
            variables: {
              deleteBookId: id,
            },
            update: (cache) => {
              router.push("/");
              cache.evict({ id: "Book:" + id });
              cache.evict({ fieldName: "getBooks:{}" });
            },
          });
        }}
      >
        Yes!
      </button>
    </div>
  );

  return (
    <>
      <div className="text-sm my-3 text-gray-500 underline ">
        <span
          className="hover:text-gray-200 cursor-pointer"
          onClick={() => {
            setShowModal(true);
            setModalContent(editModal);
          }}
        >
          Edit plot
        </span>
        <span
          className="ml-2 hover:text-gray-200 cursor-pointer"
          onClick={() => {
            setShowModal(true);
            setModalContent(deleteModal);
          }}
        >
          Delete book
        </span>
      </div>
      {showModal && (
        <Modal
          onClick={() => {
            setShowModal(false), setModalContent(null);
          }}
        >
          {modalContent}
        </Modal>
      )}
    </>
  );
};

export default EditBook;
