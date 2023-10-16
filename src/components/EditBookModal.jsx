import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewActions } from "../store/view-slice";
import { getAuthToken } from "./auth/AuthVerify";
import useInput from "../hooks/useInput";
import { getForm, notEmpty } from "./utils/form";
import Input from "./form/Input";
import LoaderSpinner from "./LoaderSpinner";

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
  const [, borrowerProps] = useInput((val) => val || !val, formData.borrower);
  const [borrowedState, setBorrowedState] = useState(formData.isAvailable ? false : true);

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

  async function handleNewBook(event) {
    event.preventDefault();
    return;
  }

  return (
    <>
      <div className="overlay-bg" onClick={closeModal}></div>
      <div className="new-book-modal">
        <div className="new-book-modal_background-side"></div>
        <div className="new-book-modal_form-side">
          <h1>Editar Libro</h1>
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
                  Yes
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

export default EditBookModal;
