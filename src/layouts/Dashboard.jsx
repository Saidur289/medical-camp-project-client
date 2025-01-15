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

const Dashboard = () => {
  const [isAdmin] = useAdmin();
 const {user, handleSignOut} = useAuth()
 const navigate = useNavigate()
 const handleLogOut = () => {
  handleSignOut()
  .then(() => {
    toast.success('LogOut Successfully')
    navigate('/')
  })
}
  return (
    <div className="md:flex">
      <div className="md:w-64 min-h-screen bg-secondary text-black">
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
                <NavLink to="/dashboard/anatics">
                  <FaGrav className="mr-2 text-myAccent" /> My Amatic
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
            <button onClick={handleLogOut} ><FaColonSign className="mr-2 text-myAccent" /> LogOut</button>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
