import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { viewActions } from "../store/view-slice";
import GlobalFilter from "./table/GlobalFilter";
import { Add, DeleteOutline, EditNote } from "@mui/icons-material";
import axios from "axios";
import { getAuthToken } from "./auth/AuthVerify";
import fetchBooks from "./utils/fetchBooks";
import { booksActions } from "../store/books-slice";
import { useEffect, useState } from "react";
import ConfirmDeletion from "./ConfirmDeletion";

const overlays = document.getElementById("overlays");

function BookActions({ tableFilter, tableSetFilter, selectedRows }) {
  const dispatch = useDispatch();
  const openNewBookModal = () => dispatch(viewActions.toggleNewBookModalState(true));
  const [showConfirmDeletion, setShowConfirmDeletion] = useState(false);
  const [confirmationState, setConfirmationState] = useState(false);
  const token = getAuthToken();

  const openEditBookModal = () => {
    dispatch(
      viewActions.toggleEditBookModalState({
        open: true,
        data: selectedRows[0].original,
      })
    );
  };

  const handleBookDeletion = async () => {
    // confirm deletion
    setShowConfirmDeletion(true);
  };

  useEffect(() => {
    if (confirmationState) {
      console.log("DELETION CONFIRMED");
      const data = { bookIDs: [] };
      data.bookIDs = selectedRows.map((row) => row.original._id);
      axios(`${process.env.REACT_APP_API_URL}/books/delete`, {
        method: "delete",
        data,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          console.log(res);
          fetchBooks({}).then((booksData) => {
            dispatch(booksActions.storeBooks(booksData));
          });
          setConfirmationState(false);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("DELETION FALSE");
    }
  }, [confirmationState, dispatch, token]); //eslint-disable-line

  return (
    <div className="book-actions">
      {showConfirmDeletion &&
        ReactDOM.createPortal(
          <ConfirmDeletion
            confirm={() => setConfirmationState(true)}
            closeModal={() => setShowConfirmDeletion(false)}
          />,
          overlays
        )}
      <GlobalFilter filter={tableFilter} setFilter={tableSetFilter} />
      <div className="book-actions_buttons">
        <button
          disabled={selectedRows.length === 0}
          className="delete-book-btn"
          onClick={handleBookDeletion}
        >
          <DeleteOutline fontSize="large" />
        </button>
        <button
          disabled={selectedRows.length !== 1}
          className="edit-book-btn"
          onClick={openEditBookModal}
        >
          <EditNote fontSize="large" />
        </button>
        <button className="new-book-btn" onClick={openNewBookModal}>
          <Add fontSize="large" />
        </button>
      </div>
    </div>
  );
}

export default BookActions;
