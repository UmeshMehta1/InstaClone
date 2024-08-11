import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import MainLayout from "./MainLayout";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Chat from "./pages/Chat";
import { Toaster } from "react-hot-toast";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

const browserRoute = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },

      {
        path: "/profile/edit",
        element: <EditProfile />,
      },
      {
        path: "/Login",
        element: <Login />,
      },

      {
        path: "/register",
        element: <Signup />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={browserRoute} />;
      <Toaster />
    </>
  );
};

export default App;
