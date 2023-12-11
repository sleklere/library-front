import { useRouteError } from "react-router-dom";
import useSetPageTitle from "../hooks/useSetPageTitle";
import { Link } from "react-router-dom/dist";

function Error(props) {
  useSetPageTitle(props.pageTitle);

  const error = useRouteError();
  console.log(error);

  let title = "An error ocurred";
  let message = "Something went wrong";

  if (error.data?.status === 500) {
    // message = JSON.parse(error.data).message
    message = error.data.message;
  }

  if (error.data?.status === 404 || error.status === 404) {
    title = "Not found";
    message = "No page or resource was found";
  }
  if (error.data?.status === 401) {
    title = error.data.title;
    message = error.data.message;
  }

  return (
    <main className="error">
      <div className="error-container">
        <h1 className="error__status">{error.status}</h1>
        <h2 className="error__title">{title}</h2>
        <p className="error__message">{message}</p>
        <Link to={"/home"}>
          <button>Back to Home</button>
        </Link>
      </div>
    </main>
  );
}

export default Error;
