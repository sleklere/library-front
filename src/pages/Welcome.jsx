import { Link } from "react-router-dom";
import useSetPageTitle from "../hooks/useSetPageTitle";

function Welcome(props) {
  useSetPageTitle(props.pageTitle);

  return (
    <>
      <div className="welcome">
        <h1 className="welcome__title">Mi Biblioteca</h1>
        <div className="welcome__title__background"></div>

        <Link className="welcome__btn" to={"/login"}>
          <button>Acceder</button>
        </Link>
      </div>
    </>
  );
}

export default Welcome;
