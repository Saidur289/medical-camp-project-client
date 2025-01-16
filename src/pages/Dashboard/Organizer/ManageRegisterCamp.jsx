import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ManageRegisterCamp = () => {
  const axiosSecure = useAxiosSecure();
  const { data: participants = [], refetch } = useQuery({
    queryKey: ["all-participant"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-participant");
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
        </div>
      </div>
    </>
  );
};

export default ManageRegisterCamp;
