import ReactDOM from "react-dom";
import { Outlet } from "react-router-dom";
import AuthVerify from "./components/auth/AuthVerify";
import NewBookModal from "./components/NewBookModal";
import EditBookModal from "./components/EditBookModal";
import { useSelector } from "react-redux";

const overlays = document.getElementById("overlays");

function MainLayout() {
  const newBookModalState = useSelector((state) => state.view.newBookModalOpen);
  const editBookModalState = useSelector(
    (state) => state.view.editBookModalOpen
  );

  return (
    <>
      <AuthVerify>
        {newBookModalState && ReactDOM.createPortal(<NewBookModal />, overlays)}
        {editBookModalState &&
          ReactDOM.createPortal(<EditBookModal />, overlays)}
        <Outlet
        />
      </AuthVerify>
    </>
  );
}

export default MainLayout;
