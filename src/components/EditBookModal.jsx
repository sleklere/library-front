import { useDispatch } from "react-redux";
import { viewActions } from "../store/view-slice";

function EditBookModal() {
  const dispatch = useDispatch();

  const closeModal = () =>
    dispatch(viewActions.toggleEditBookModalState(false));

  return (
    <div className="overlay-bg" onClick={closeModal}>
      <div className="edit-book-modal"></div>
    </div>
  );
}

export default EditBookModal;
