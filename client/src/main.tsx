import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.scss";
import AppRoot from "./routes/app-root";
import ErrorPage from "./routes/error-page";
import Profile from "./routes/profile";
import Home from "./routes/home";
import BreedPage from "./routes/breed-page";
import { ConfigProvider as AntdConfigProvider } from "antd";
import { loader as breedLoader } from "./loaders/breed"
import { loader as profileLoader } from "./loaders/profile"
import { loader as postLoader } from "./loaders/post"
import LoginPage from "./routes/login";
import RegisterPage from "./routes/register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PostPage from "./routes/post-page";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <AppRoot />,
    errorElement: <ErrorPage />,
    children: [

      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "profile/:userId",
        element: <Profile />,
        loader: profileLoader,
      },
      {
        path: "post/:postId",
        element: <PostPage />,
        loader: postLoader,
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
  <GoogleOAuthProvider clientId="511357191065-161sifh64nai3q04va24pqne716c95ml.apps.googleusercontent.com">
    <AntdConfigProvider
      theme={{
        token: {
          colorBgContainer: "#fdf9e3",
          colorPrimary: "#ff8717",
        },
        components: {
          Button: {
            defaultShadow: "none"
          },
          Modal: {
            contentBg: '#242424',
            headerBg: '#242424',
            titleColor: "white",
            colorIcon: "white",
            colorIconHover: "white"
          },
          Layout: {
            bodyBg: '#242424',
            colorText: 'white'
          },
          List: {
            colorText: 'white'
          },
        },
      }}
    >
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </AntdConfigProvider>
  </GoogleOAuthProvider>

);