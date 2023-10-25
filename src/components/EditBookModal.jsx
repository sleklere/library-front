import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewActions } from "../store/view-slice";
import { getAuthToken } from "./auth/AuthVerify";
import useInput from "../hooks/useInput";
import { getForm, notEmpty } from "./utils/form";
import Input from "./form/Input";
import LoaderSpinner from "./LoaderSpinner";
import axios from "axios";
import fetchBooks from "./utils/fetchBooks";
import { booksActions } from "../store/books-slice";

function EditBookModal() {
  const dispatch = useDispatch();
  const { editBookFormData: formData } = useSelector((state) => state.view);

  const closeModal = () => dispatch(viewActions.toggleEditBookModalState(false));

  const [titleInputStates, titleProps] = useInput(notEmpty, formData.title);
  const [authorInputStates, authorProps] = useInput(notEmpty, formData.author);
  // optional field, doesn't need validating but the other states are useful
  const [ctgryInputStates, ctgryProps] = useInput(
    (val) => val || !val,
    formData.categories.join(", ")
  );
  const [borrowedState, setBorrowedState] = useState(formData.isAvailable ? false : true);
  const [borrowerInputStates, borrowerProps] = useInput(
    (val) => val.trim() !== "" || !borrowedState,
    formData.borrower
  );

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

  const { formIsValid } = getForm(
    titleInputStates,
    authorInputStates,
    ctgryInputStates,
    borrowerInputStates
  );

  async function handleEditBook(event) {
    event.preventDefault();
    setIsFormSubmitting(true);
    if (!formIsValid) {
      setIsFormSubmitting(false);
      return;
    }

    try {
      console.log(formData);
      const data = {
        author: authorProps.value,
        title: titleProps.value,
        categories: formatCathegories(ctgryProps.value),
        userId: user._id,
        isAvailable: !borrowedState,
      };
      if (borrowerProps.value.trim() !== "") {
        data.borrower = borrowerProps.value;
      }
      console.log(data);
      await axios(`${process.env.REACT_APP_API_URL}/books/${formData._id}/edit`, {
        method: "patch",
        data,
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsFormSubmitting(false);

      fetchBooks({}).then((booksData) => {
        dispatch(booksActions.storeBooks(booksData));
      });
    } catch (err) {
      console.log(err);
      setIsFormSubmitting(false);
      setFormBackError(err.response?.data.message);
    }

    return;
  }

  return (
    <>
      <div className="overlay-bg" onClick={closeModal}></div>
      <div className="new-book-modal">
        <div className="new-book-modal_background-side"></div>
        <div className="new-book-modal_form-side">
          <h1>Editar Libro</h1>
          {formBackError?.length > 0 && <p className="error-text">{formBackError}</p>}
          <form onSubmit={handleEditBook} className="form">
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
                errMsg="Borrower must have a name."
                {...borrowerProps}
              />
            )}
            <button type="submit" disabled={!formIsValid}>
              {isFormSubmitting ? <LoaderSpinner /> : "Guardar cambios"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditBookModal;
