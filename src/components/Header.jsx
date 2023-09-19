import { Link } from "react-router-dom";
import { viewActions } from "../store/view-slice";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const dispatch = useDispatch();
  const viewState = useSelector((state) => state.view.view);
  const handleToggle = function (e) {
    dispatch(viewActions.toggleView(e.target.value));
  };

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
          <label className="radio-button" htmlFor="view-toggle-table">
            {" "}
            Table
          </label>

          <input
            type="radio"
            id="view-toggle-mosaic"
            name="view"
            value="Mosaic"
            onChange={handleToggle}
            checked={viewState === "Mosaic"}
          />
          <label className="radio-button" htmlFor="view-toggle-mosaic">
            {" "}
            Mosaic
          </label>
        </div>
      </div>
      <Link to={"/"} className="header__logout-btn">
        <button className="btn">Logout</button>
      </Link>
    </header>
  );
}

export default Header;
