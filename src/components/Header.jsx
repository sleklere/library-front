import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { viewActions } from "../store/view-slice";
import { userActions } from "../store/user-slice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewState = useSelector((state) => state.view.view);

  const handleToggle = function (e) {
    dispatch(viewActions.toggleView(e.target.value));
  };

  async function logoutHandler() {
    dispatch(userActions.logout());
    navigate("/login");
  }

  return (
    <header className="header">
      <h1 className="header__title">Mi Biblioteca</h1>
      <div className="header__content-view-toggle">
        <div className="view-toggle">
          <input
            type="radio"
            id="view-toggle-table"
            name="view"
            value="Table"
            onChange={handleToggle}
            checked={viewState === "Table"}
          />
          <label htmlFor="view-toggle-table"> Table</label>

          <input
            type="radio"
            id="view-toggle-mosaic"
            name="view"
            value="Mosaic"
            onChange={handleToggle}
            checked={viewState === "Mosaic"}
          />
          <label htmlFor="view-toggle-mosaic"> Mosaic</label>
        </div>
      </div>
      <button className="btn header__logout-btn" onClick={logoutHandler}>
        Logout
      </button>
    </header>
  );
}

export default Header;
