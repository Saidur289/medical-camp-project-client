import {
    createBrowserRouter,

  } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import CampDetails from "../pages/CampDetails/CampDetails";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Dashboard/Participant/Profile";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: '/login',
          element: <Login></Login>,
        },
        {
          path: '/signup',
          element: <SignUp></SignUp>,
        },
        {
          path: '/campDetails/:id',
          element: <CampDetails></CampDetails>,
        }
      ]
    },
    {
      path: 'dashboard',
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: 'profile',
          element: <Profile></Profile>
        }
      ]
    }
  ]);
export default router  