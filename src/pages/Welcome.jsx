import { Link } from "react-router-dom";
import useSetPageTitle from "../hooks/useSetPageTitle";

function Welcome(props) {
  useSetPageTitle(props.pageTitle);

  return (
    <>
      <div className="welcome">
        <h1 className="welcome__title">Mi Biblioteca</h1>
        <div className="welcome__title__background"></div>
        <div className="welcome__box-1"></div>
        <div className="welcome__box-2"></div>
        {/* <div className="welcome__box-3"></div> */}

        <Link className="welcome__btn" to={"/login"}>
          <button>Acceder</button>
        </Link>
      </div>
    </>
  );
}

export default Welcome;
