
import { useAuth } from "../../../hooks/useAuth";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import useAdmin from "../../../hooks/useAdmin";
import logo from '../../../assets/images/icons8-medical-100.png'

const Navbar = () => {
  
  const {user, handleSignOut} = useAuth()
  const [isAdmin] = useAdmin()
  const handleLogOut = () => {
    handleSignOut()
    .then(() => {
      toast.success('LogOut Successfully')
    })
  }
    const links = <>
     <li className="uppercase">
              <NavLink to='/'>Home</NavLink>
            </li>
        
            <li className="uppercase">
              <NavLink to = '/availableCamp'>Available Camp</NavLink>
            </li>
    </>
  return (
   <div className="bg-[#eef1fd] container mx-auto border-b-2">
     <div className="navbar ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="md:hidden lg:hidden">
            <img src={logo} className="w-8" alt="" />
          </div>
          <ul
            tabIndex={0}
            className="menu z-10 pl-0 menu-sm dropdown-content bg-base-100 rounded-box  mt-3 w-52 p-2 shadow"
          >
           {links}
          </ul>
        </div>
        <a className="text-xl  hidden md:block md:flex md:items-center">
          <img src={logo} className="w-8 mr-1" alt="" />
          Camps</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
        {links}
        </ul>
      </div>
      <div className="navbar-end z-10">
        {user? <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
              referrerPolicy="no-referrer"
                alt=""
                src={user?.photoURL}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                {user?.displayName}
              
              </a>
            </li>
             {user && isAdmin && <li>
              <NavLink to='/dashboard/manageCamp'>Dashboard</NavLink>
            </li> }
            {
              user && !isAdmin && <li>
              <NavLink to='/dashboard/registerCamp'>Dashboard</NavLink>
            </li>
            }
            
            <li onClick={handleLogOut}>
              <a>Logout</a>
            </li>
          </ul>
        </div> : <Link to = '/login'><button className="px-5 py-3 bg-primary text-white rounded-sm">Join Us</button></Link>}
       
      </div>
    </div>
   </div>
  );
};

export default Navbar;
