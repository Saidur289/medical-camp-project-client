import {
  FaHome,
  FaMandalorian,
  FaPaypal,
  FaRegistered,
  FaStackpath,
  FaUser,
} from "react-icons/fa";
import { FaColonSign, FaGrav, FaKitMedical } from "react-icons/fa6";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import Loading from "../components/shared/Loading/Loading";

const Dashboard = () => {
  const [isAdmin, isLoading] = useAdmin();
  const { user, handleSignOut } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    handleSignOut().then(() => {
      toast.success("LogOut Successfully");
      navigate("/");
    });
  };
  if(isLoading) return <Loading></Loading>
  return (
    <>
    <Helmet>
      <title>DashBoard</title>
    </Helmet>
      <div className="md:flex">
        <div className="md:w-64 md:min-h-screen bg-secondary text-black">
          <ul className="menu p-4">
            {isAdmin ? (
              <>
                {" "}
                <li>
                  <NavLink to="/dashboard/adminProfile">
                    <FaUser className="mr-2 text-myAccent" /> Organizer Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addCamp">
                    <FaKitMedical className="mr-2 text-myAccent" /> Add A Camp
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageCamp">
                    <FaMandalorian className="mr-2 text-myAccent" />
                    Manage Camps
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageRegisterCamp">
                    <FaStackpath className="mr-2 text-myAccent" />
                    Manage Register Camps
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {" "}
                <li>
                  <NavLink to="/dashboard/profile">
                    <FaUser className="mr-2 text-myAccent"></FaUser> My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/registerCamp">
                    <FaRegistered className="mr-2 text-myAccent"></FaRegistered>{" "}
                    My Register Camps
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/history">
                    <FaPaypal className="mr-2 text-myAccent" />
                    Payment History
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/analytics">
                    <FaGrav className="mr-2 text-myAccent" /> My Analytics
                  </NavLink>
                </li>
              </>
            )}
            {/* participant route */}

            {/* admin route  */}

            {/* shared */}
            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome className="mr-2 text-myAccent"></FaHome> Home
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogOut}>
                <FaColonSign className="mr-2 text-myAccent" /> LogOut
              </button>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
