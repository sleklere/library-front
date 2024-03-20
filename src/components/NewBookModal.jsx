import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewActions } from "../store/view-slice";
import useInput from "../hooks/useInput";
import { getForm, notEmpty } from "./utils/form";
import { getAuthToken } from "./auth/AuthVerify";
import LoaderSpinner from "./LoaderSpinner";
import Input from "./form/Input";
import axios from "axios";
import fetchBooks from "./utils/fetchBooks";
import { booksActions } from "../store/books-slice";
import { Close } from "@mui/icons-material";

function NewBookModal() {
  const dispatch = useDispatch();
  const [titleInputStates, titleProps] = useInput(notEmpty);
  const [authorInputStates, authorProps] = useInput(notEmpty);
  // optional field, doesn't need validating but the other states are useful
  const [ctgryInputStates, ctgryProps] = useInput((val) => val || !val);
  const [, borrowerProps] = useInput((val) => val || !val);
  const [borrowedState, setBorrowedState] = useState(false);

  const [formBackError, setFormBackError] = useState("");
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const token = getAuthToken();
  const user = useSelector((state) => state.user.data);

  const toggleBorrowed = () => setBorrowedState((prevState) => !prevState);

  const formatCathegories = (cathegoriesString) => {
    return cathegoriesString.split(",").map((ctgry) => {
      let str = ctgry.trim();
      return str.charAt(0).toUpperCase() + str.slice(1);
    });
  };

  const { formIsValid, formReset } = getForm(titleInputStates, authorInputStates, ctgryInputStates);

  const closeModal = () => {
    dispatch(viewActions.toggleNewBookModalState(false));
  };

  async function handleNewBook(event) {
    event.preventDefault();
    setIsFormSubmitting(true);

    if (!formIsValid) {
      setIsFormSubmitting(false);
      return;
    }

    try {
      await axios(`${process.env.REACT_APP_API_URL}${"/books"}`, {
        method: "post",
        data: {
          author: authorProps.value,
          title: titleProps.value,
          categories: formatCathegories(ctgryProps.value),
          userId: user._id,
          isAvailable: !borrowedState,
          borrower: borrowerProps.value,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      formReset();
      setIsFormSubmitting(false);
      closeModal();

      fetchBooks({}).then((booksData) => {
        dispatch(booksActions.storeBooks(booksData));
      });
    } catch (err) {
      console.log(err);
      setIsFormSubmitting(false);
      setFormBackError(err.response.data.message);
    }
  }

  return (
    <>
      <div className="overlay-bg" onClick={closeModal}></div>
      <div className="new-book-modal" onClick={closeModal}>
        <div className="modal-close">
          <Close fontSize="large" />
        </div>
        <div className="new-book-modal_background-side"></div>
        <div className="new-book-modal_form-side">
          <h1>Nuevo Libro</h1>
          {formBackError.length > 0 && <p className="error-text">{formBackError}</p>}
          <form onSubmit={handleNewBook} className="form">
            <Input
              type="text"
              labelText="Título"
              placeholder="Título del libro"
              errMsg="Please enter a book title"
              {...titleProps}
            />
            <Input
              type="text"
              labelText="Autor"
              placeholder="Nombre del autor"
              errMsg="Book must have an author"
              {...authorProps}
            />
            <Input
              type="text"
              labelText="Categorías"
              placeholder="Ficción, filosofía, etc"
              {...ctgryProps}
            />
            <div className="borrowed-input-container">
              <span>Prestado</span>
              <div className="borrowed-toggle">
                <input
                  type="radio"
                  id="borrowed"
                  name="borrowed"
                  value="Yes"
                  onChange={toggleBorrowed}
                  checked={borrowedState}
                />
                <label className="radio-button" htmlFor="borrowed">
                  Sí
                </label>

                <input
                  type="radio"
                  id="not-borrowed"
                  name="borrowed"
                  value="No"
                  onChange={toggleBorrowed}
                  checked={!borrowedState}
                />
                <label className="radio-button" htmlFor="not-borrowed">
                  {" "}
                  No
                </label>
              </div>
            </div>
            {borrowedState && (
              <Input
                type="text"
                labelText="A quién?"
                placeholder="Juan Gonzalez"
                {...borrowerProps}
              />
            )}
            <button type="submit" disabled={!formIsValid}>
              {isFormSubmitting ? <LoaderSpinner /> : "Crear libro"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewBookModal;
