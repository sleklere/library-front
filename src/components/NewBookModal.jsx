import { useDispatch } from "react-redux";
import { viewActions } from "../store/view-slice";

function NewBookModal() {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(viewActions.toggleNewBookModalState(false));
  };

  return (
    <>
      <div className="overlay-bg" onClick={closeModal}></div>
      <div className="new-book-modal">
        <div className="new-book-modal_background-side"></div>
        <div className="new-book-modal_form-side">
          <h1>Nuevo Libro</h1>
          <form className="form">
            <label>
              Nombre
              <input type="text" placeholder="Nombre del libro" />
            </label>
            <label>
              Autor
              <input type="text" placeholder="Nombre del libro" />
            </label>
            <label>
              Categorías
              <input type="text" placeholder="Nombre del libro" />
            </label>
            <button type="submit">Crear libro</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewBookModal;
