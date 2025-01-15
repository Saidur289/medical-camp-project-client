import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/shared/Loading/Loading";


const ManageCamp = () => {
    const {user} = useAuth()
    console.log(user.email);
    const axiosSecure = useAxiosSecure()
    const {data: camps, isLoading} = useQuery({
        queryKey: ['camps', user?.email],
        queryFn: async() => {
            const res = await  axiosSecure.get(`/camp`)
            return res.data
        }
    })
    console.log(camps);
    if(isLoading) return <Loading></Loading>
    return (
        <div>
            <h1 className="text-3xl text-primary text-center py-3">Total Campaign {camps.length}</h1>
        </div>
    );
};

export default ManageCamp;