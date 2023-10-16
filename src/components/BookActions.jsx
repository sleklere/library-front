import { useDispatch } from "react-redux";
import { viewActions } from "../store/view-slice";
import GlobalFilter from "./table/GlobalFilter";

function BookActions({ tableFilter, tableSetFilter, selectedRows }) {
  const dispatch = useDispatch();
  const openNewBookModal = () => dispatch(viewActions.toggleNewBookModalState(true));

  const openEditBookModal = () => {
    console.log(selectedRows);
    dispatch(
      viewActions.toggleEditBookModalState({
        open: true,
        data: selectedRows[0].original,
      })
    );
  };

  return (
    <div className="book-actions">
      <GlobalFilter filter={tableFilter} setFilter={tableSetFilter} />
      <div className="book-actions_buttons">
        <button
          disabled={selectedRows.length !== 1}
          className="edit-book-btn"
          onClick={openEditBookModal}
        >
          Editar Libro
        </button>
        <button className="new-book-btn" onClick={openNewBookModal}>
          Nuevo Libro
        </button>
      </div>
    </div>
  );
}

export default BookActions;
