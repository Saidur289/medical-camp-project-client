import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useParticipantCount from "../../../hooks/useParticipantCount";
import { useState } from "react";

const ManageRegisterCamp = () => {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState('')
  const [count] = useParticipantCount()
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
  const { data: participants = [], refetch } = useQuery({
    queryKey: ["all-participant", currentPage, itemsPerPage, filter],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-participant?page=${currentPage}&size=${itemsPerPage}&filter=${filter}`);
      console.log(res.data);
      return res.data;
    },
  });
  const handleStatus = async (newStatus, id) => {
    if (newStatus === "Pending") return;
    try {
      await axiosSecure.patch(`/update-payment-status/${id}`, {
        status: newStatus,
      });
      toast.success("Status Updated Successfully");
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleDelete = async (id, campId) => {
    try {
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
          const res = await axiosSecure.delete(`/participants/${id}`);
          await axiosSecure.patch(`/update-count/${campId}`, {
            status: "decrease",
          });
          toast.success("Cancel Successful");
          refetch();
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
    } catch (error) {
      toast.error(error.response.message);
    }
  };
  return (
    <>
     <Helmet>
          <title>Dashboard | Register Camp</title>
        </Helmet>
      <div className="bg-[#eef1fd] md:min-h-screen">
        <h1 className="text-3xl text-primary py-3 text-center">
          Manage Your Participant
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
                <th>Participant Name</th>
                <th>Camp Name</th>
                <th>Camp Fees</th>
                <th>Payment Status</th>
                <th>Confirm Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {participants.length === 0 ? (
                <>
                  <tr>You have no data</tr>
                </>
              ) : (
                participants.map((participant, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{participant?.participant?.name}</td>
                    <td>{participant?.campName}</td>
                    <td>{participant?.campFees}</td>
                    <td>{participant?.paymentStatus}</td>
                    <td>
                      {/* {participant?.confirmStatus} */}
                      <select
                        onChange={(e) =>
                          handleStatus(e.target.value, participant._id)
                        }
                        disabled={
                          participant?.confirmStatus === "Confirmed" ||
                          participant?.paymentStatus === "Unpaid"
                        }
                        defaultValue={participant?.confirmStatus}
                        className="select select-bordered select-xs w-full max-w-xs"
                      >
                        <option>Update Status</option>
                        <option value={"Pending"}>Pending</option>
                        <option value={"Confirmed"}>Confirmed</option>
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          handleDelete(participant._id, participant.campId)
                        }
                        disabled={
                          participant?.paymentStatus === "Paid" &&
                          participant?.confirmStatus === "Confirmed"
                        }
                        className="btn btn-xs bg-primary text-white"
                      >
                        Cancel
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

export default ManageRegisterCamp;
