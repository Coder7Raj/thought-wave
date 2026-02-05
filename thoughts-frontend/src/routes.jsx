import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./pages/Signup";

export const serveruri = "http://localhost:5000";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
