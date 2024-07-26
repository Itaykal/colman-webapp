import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.scss";
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import Profile from "./routes/profile";
import Home from "./routes/home";
import BreedPage from "./routes/breed-page";
import { ConfigProvider } from "antd";
import { loader as breedLoader } from "./loaders/breed"
import { loader as profileLoader } from "./loaders/profile"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [

      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "profile/:userHandle",
        element: <Profile />,
        loader: profileLoader,
      },
      {
        path: "breed/:breedId",
        element: <BreedPage />,
        loader: breedLoader,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as ReactDOM.Container).render(
  <ConfigProvider
    theme={{
      components: {
        Modal: {
          contentBg: '#242424',
          headerBg: '#242424',
          titleColor: "white",
          colorIcon: "white",
          colorIconHover: "white"
        }
      },
    }}
  >
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ConfigProvider>

);