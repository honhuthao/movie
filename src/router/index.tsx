import { RouteObject } from "react-router-dom";
import { Logins, Register } from "Pages";
import { PATH } from "constant";
import { AuthLayout } from "components/layouts/index";
import Home from "Pages/Home";
import MainLayout from "components/layouts/MainLayout";
import Details from "Pages/Details";
import Checkout from "Pages/Checkout";
import Admin from "Pages/Amin/Admin";
import Film from "Pages/Amin/Film";
import DashBoard from "Pages/Amin/DashBoard";
import ShowTimes from "Pages/Amin/ShowTimes";
import AddFilm from "Pages/Amin/AddFilm";
import EditFilm from "Pages/Amin/EditFilm";
import Account from "Pages/Account";
export const router: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: PATH.account,
        element: <Account />,
      },
      {
        path: PATH.home,
        element: <Home />,
      },
      {
        path: PATH.detail,
        element: <Details />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: PATH.login,
            element: <Logins />,
          },

          {
            path: PATH.resgister,
            element: <Register />,
          },
        ],
      },
    ],
  },
  {
    element: <Checkout />,
    path: PATH.checkout,
  },
  {
    element: <Admin />,
    children: [
      {
        path: PATH.film,
        element: <Film />,
      },
      {
        path: PATH.addFilm,
        element: <AddFilm />,
      },
      {
        path: PATH.edit,
        element: <EditFilm />,
      },
      {
        path: PATH.dashboard,
        element: <DashBoard />,
      },
      {
        path: PATH.showtimes,
        element: <ShowTimes />,
      },
    ],
  },
];
