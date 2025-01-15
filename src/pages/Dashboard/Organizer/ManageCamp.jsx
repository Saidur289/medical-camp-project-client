import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/shared/Loading/Loading";
import { FaEdit, FaTrash } from "react-icons/fa";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageCamp = () => {
  const { user } = useAuth();
  console.log(user.email);
  const axiosSecure = useAxiosSecure();
  const {
    data: camps,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["camps", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/camp`);
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/camps/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };
  return (
    <div className="bg-[#eef1fd]  md:min-h-screen">
      <h1 className="text-3xl text-primary text-center py-3">
        Total Campaign {camps.length}
      </h1>
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
            {camps.length === 0 ? (
              <>
                <td>You have no data</td>
              </>
            ) : (
              camps.map((camp, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{camp?.campName}</td>
                  <td>{camp?.campFees}</td>
                  <td>
                    {format(new Date(camp?.dateTime), "MMM-dd-yyyy h:mm")}
                  </td>
                  <td>{camp?.location}</td>
                  <td>
                    <Link to={`/dashboard/updateCamp/${camp._id}`}>
                      <button className="btn btn-xs">
                        <FaEdit className="text-myAccent"></FaEdit>
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(camp._id)}
                      className="btn btn-xs"
                    >
                      <FaTrash className="text-red-500"></FaTrash>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCamp;
