import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/Login";
import { BookManage } from "./pages/BookManage";
import { Register } from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BookManage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
const root = createRoot(document.getElementById("root")!);

root.render(<RouterProvider router={router} />);
