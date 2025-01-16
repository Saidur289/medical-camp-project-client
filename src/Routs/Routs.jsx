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
import PrivateRoute from "./PrivateRoute";
import MyRegisterCamp from "../pages/Dashboard/Participant/MyRegisterCamp";
import PaymentHistory from "../pages/Dashboard/Participant/PaymentHistory";
import AdminRoute from "./AdminRoute";
import ManageCamp from "../pages/Dashboard/Organizer/ManageCamp";
import AddCamp from "../pages/Dashboard/Organizer/AddCamp";
import UpdateCamp from "../pages/Dashboard/Organizer/UpdateCamp";
import ManageRegisterCamp from "../pages/Dashboard/Organizer/ManageRegisterCamp";
import Analytics from "../pages/Dashboard/Participant/Analytics";
import ErrorPage from "../components/shared/ErrorPage/ErrorPage";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <ErrorPage></ErrorPage>,
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
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: 'profile',
          element: <PrivateRoute><Profile></Profile></PrivateRoute>,
        },
        {
          path: 'registerCamp',
          element: <PrivateRoute><MyRegisterCamp></MyRegisterCamp></PrivateRoute>,
        },
        {
          path: 'history',
          element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
        },
        {
          path: 'analytics',
          element: <PrivateRoute><Analytics></Analytics></PrivateRoute>,
        },
        {
          path: 'manageCamp',
          element: <AdminRoute><ManageCamp></ManageCamp></AdminRoute>
        },
        {
          path: 'addCamp',
          element: <AdminRoute><AddCamp></AddCamp></AdminRoute>
        },
        {
          path: 'updateCamp/:id',
          element: <AdminRoute><UpdateCamp></UpdateCamp></AdminRoute>
        },
        {
          path: 'manageRegisterCamp',
          element: <AdminRoute><ManageRegisterCamp></ManageRegisterCamp></AdminRoute>
        }
      ]
    }
  ]);
export default router  