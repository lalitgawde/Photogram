import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Error from "./pages/Error";
import Profile from "./pages/Profile";
import MyPhotos from "./pages/MyPhotos";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Logout from "./pages/Logout";
import ProtectedRoutes from "./components/ProtectedRoutes";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <Error />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "/profile",
        element: <Profile />,
        errorElement: <Error />,
      },
      {
        path: "/my-photos",
        element: <MyPhotos />,
        errorElement: <Error />,
      },
      {
        path: "/create-post",
        element: <CreatePost />,
        errorElement: <Error />,
      },
      {
        path: "/logout",
        element: <Logout />,
        errorElement: <Error />,
      },
    ],
  },
]);

export default routes;
