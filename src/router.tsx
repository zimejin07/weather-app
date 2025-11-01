import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import CityDetailsPage from "./pages/CityDetailsPage";
import UserLocationPage from "./pages/UserLocationPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "city/:cityId",
        element: <CityDetailsPage />,
      },
      {
        path: "my-location",
        element: <UserLocationPage />,
      },
    ],
  },
]);
