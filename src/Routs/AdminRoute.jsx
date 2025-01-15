import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/shared/Loading/Loading";


const AdminRoute = ({children}) => {
    const [isAdmin, isLoading] = useAdmin()
    const {user, loading} = useAuth()
    const location = useLocation()
    if(loading || isLoading){
        return <Loading></Loading>
    }
    if(user && isAdmin){
        return children
    }
    return (
        <Navigate state={location.pathname} to = '/'></Navigate>
    );
};

export default AdminRoute;