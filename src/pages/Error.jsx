import { useRouteError } from "react-router-dom";
import useSetPageTitle from "../hooks/useSetPageTitle";

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
    <>
      <h1>{error.status}</h1>
      <h2>{title}</h2>
      <p>{message}</p>
    </>
  );
}

export default Error;
