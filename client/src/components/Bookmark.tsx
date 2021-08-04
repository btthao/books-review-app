import React, { useState } from "react";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import {
  useBookmarkMutation,
  useMeQuery,
  useRemoveBookmarkMutation,
} from "../generated/graphql";
import Modal from "./Modal";
import { updateCacheAfterBookmark } from "../utils/updateCache";

interface BookmarkProps {
  bookmarkStatus: boolean | null;
  bookId: number;
}

const Bookmark: React.FC<BookmarkProps> = ({ bookmarkStatus, bookId }) => {
  const [bookmark] = useBookmarkMutation();
  const [removeBookmark] = useRemoveBookmarkMutation();
  const { data, loading } = useMeQuery();
  const [showModal, setShowModal] = useState(false);
  // console.log(data);
  return (
    <>
      <BookmarkIcon
        className={`fill-current cursor-pointer  ${
          bookmarkStatus ? "text-lime-400 " : "text-gray-400"
        } `}
        onClick={async () => {
          if (!data?.me) {
            setShowModal(true);
          } else {
            if (bookmarkStatus) {
              await removeBookmark({
                variables: { removeBookmarkId: bookId },
                update: (cache) =>
                  updateCacheAfterBookmark(
                    data?.me?.id,
                    !bookmarkStatus,
                    bookId,
                    cache
                  ),
              });
            } else {
              await bookmark({
                variables: { bookmarkId: bookId },
                update: (cache) =>
                  updateCacheAfterBookmark(
                    data?.me?.id,
                    !bookmarkStatus,
                    bookId,
                    cache
                  ),
              });
            }
          }
        }}
      />
      {showModal && <Modal onClick={() => setShowModal(false)} />}
    </>
  );
};

export default Bookmark;
