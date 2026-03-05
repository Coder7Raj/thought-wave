import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AddThought from "./pages/AddThought";
import ForgotPass from "./pages/ForgotPass";
import Home from "./pages/Home";
import ShowAllThoughts from "./pages/ShowAllThoughts";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <ShowAllThoughts />,
          },
        ],
      },
      {
        path: "/add_thought",
        element: <AddThought />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        element: <ForgotPass />,
        path: "/reset_password",
      },
    ],
  },
]);

export default router;
