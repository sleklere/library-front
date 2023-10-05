import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Welcome from "./pages/Welcome";
import AuthLayout from "./pages/AuthLayout";
import ProtectRoute from "./components/auth/ProtectRoute";
import { getAuthToken } from "./components/auth/AuthVerify";

// protects the route so that a user can't try to login or register when he is logged in
function redirectIfNotLoggedIn() {
  const token = getAuthToken();

  if (token) {
    return redirect("/home");
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error pageTitle={"Something went wrong!"} />,
    children: [
      {
        index: true,
        element: <Welcome pageTitle={"Library App"} />,
        loader: redirectIfNotLoggedIn,
      },
      {
        path: "/home",
        element: (
          <ProtectRoute>
            <Home pageTitle={"Home"} />
          </ProtectRoute>
        ),
      },
      {
        path: "/login",
        element: <AuthLayout pageTitle={"Login"} login={true} />,
        loader: redirectIfNotLoggedIn,
      },
      {
        path: "/register",
        element: <AuthLayout pageTitle={"Register"} register={true} />,
        loader: redirectIfNotLoggedIn,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
