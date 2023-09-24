import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Welcome from "./pages/Welcome";
import AuthLayout from "./pages/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error pageTitle={"Something went wrong!"} />,
    children: [
      {
        index: true,
        element: <Welcome pageTitle={"Library App"} />,
      },
      {
        path: "/home",
        element: <Home pageTitle={"Home"} />,
      },
      {
        path: "/login",
        element: <AuthLayout pageTitle={"Login"} login={true} />,
      },
      {
        path: "/register",
        element: <AuthLayout pageTitle={"Register"} register={true} />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
