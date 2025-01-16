import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/shared/Loading/Loading";
import { FaEdit, FaTrash } from "react-icons/fa";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import useCount from "../../../hooks/useCount";

const ManageCamp = () => {
  const [filter, setFilter] = useState('')
  const { user } = useAuth();
  const [count] = useCount()
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  const numberOfPages = Math.ceil(count/itemsPerPage)
  const pages = [...Array(numberOfPages).keys()]
  const handlePerPage = e => {
    const val = parseInt(e.target.value)
    console.log(val);
    setItemsPerPage(val)
    setCurrentPage(0)
  }
  const handlePrevPage = () => {
    if(currentPage>0){
      setCurrentPage(currentPage - 1)
    }
  }
  const handleNextPage = () => {
    if(currentPage< pages.length - 1){
      setCurrentPage(currentPage + 1)
    }
  }
  // const [count, setCount]= useState(0)
  console.log(count);
  console.log(user.email);
  const axiosSecure = useAxiosSecure();
  const {
    data: camps,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["camps", user?.email, currentPage, itemsPerPage, filter],
    queryFn: async () => {
      const res = await axiosSecure.get(`/camp?page=${currentPage}&size=${itemsPerPage}&filter=${filter}`);
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
    <>
    
      <Helmet>
          <title>Dashboard | Manage Camp</title>
        </Helmet>
      <div className="bg-[#eef1fd]  md:min-h-screen">
        <h1 className="text-3xl text-primary text-center py-3">
          Total Campaign {camps.length}
        </h1>
        <div className="px-5">
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} className="grow"  placeholder= 'Search By Camp Name ' />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
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
           <div className="mb-10 mt-5 text-center">
           <button className="bg-primary text-white btn btn-sm" onClick={handlePrevPage}>Prev</button>
            {
              pages.map((page, index)=> <button onClick={() => setCurrentPage(page)} className={currentPage === page? 'bg-myAccent text-primary btn mr-2 btn-sm': 'btn mr-2 btn-sm'} key={index}>{page}</button>)
            }
            <button className="bg-primary text-white btn btn-sm" onClick={handleNextPage}>Next</button>
             <select className="select-bordered btn btn-sm" value={itemsPerPage} onChange={handlePerPage}>
              <option value="10">10</option>
              <option value="5">5</option>
              <option value="3">3</option>
             </select>
           </div>
        </div>
      </div>
    </>
  );
};

export default ManageCamp;
