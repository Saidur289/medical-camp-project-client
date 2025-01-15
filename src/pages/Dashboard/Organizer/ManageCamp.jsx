import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/shared/Loading/Loading";
import { FaEdit, FaTrash } from "react-icons/fa";
import { format } from "date-fns";


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
        <div className="bg-[#eef1fd]  md:min-h-screen">
            <h1 className="text-3xl text-primary text-center py-3">Total Campaign {camps.length}</h1>
            <div className="overflow-x-auto w-full">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Camp Name</th>
        <th>Camp Fees</th>
        <th>Date & Time</th>
        <th>Location</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {camps.length === 0? <><td>You have no data</td></>: camps.map((camp, index) =>  <tr key={index}>
        <th>{index + 1}</th>
        <td>{camp?.campName}</td>
        <td>{camp?.campFees}</td>
        <td>{format(new Date(camp?.dateTime), 'MMM-dd-yyyy h:mm')}</td>
        <td>{camp?.location}</td>
        <td>
            <button className="btn btn-xs"><FaEdit className="text-myAccent"></FaEdit></button>
            <button className="btn btn-xs"><FaTrash className="text-red-500"></FaTrash></button>
        </td>
      </tr>)}
    
    </tbody>
  </table>
</div>
        </div>
    );
};

export default ManageCamp;