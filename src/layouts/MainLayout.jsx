import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar/Navbar";
import Footer from "../components/shared/Footer/Footer";


const MainLayout = () => {
    return (
        <div className="container mx-auto h-screen flex flex-col">
           <div className="mb-[70px]">
           <Navbar></Navbar>
           </div>
            <div className="flex-grow">
        <Outlet></Outlet>
        </div> 
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;