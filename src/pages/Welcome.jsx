import { Link } from "react-router-dom";

function Welcome() {
  return (
    <>
      <div className="welcome">
        <h1 className="welcome__title">Mi Biblioteca</h1>
        <div className="welcome__title__background"></div>

        <Link className="welcome__btn" to={"/home"}>
          <button>Acceder</button>
        </Link>
      </div>
    </>
  );
}

export default Welcome;
