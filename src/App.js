import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Welcome from "./pages/Welcome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
