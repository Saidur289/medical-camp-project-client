import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/${user?.email}`);
      return res.data;
    },
  });
  // console.log(payments);

  return (
    <>
     <Helmet>
      <title>DashBoard | History</title>
    </Helmet>
      <div className="bg-[#eef1fd] md:min-h-screen">
        <h1 className="text-3xl text-primary text-center py-3">
          Your Payment History{" "}
        </h1>
        <div className="overflow-x-auto px-5 pt-5">
          <table className="table w-full bg-white ">
            {/* head */}
            <thead>
              <tr className="">
                <th>#</th>
                <th>Camp Name</th>
                <th>Camp Fees</th>
                <th>Transaction Id</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {payments.map((payment, index) => (
                <tr key={index} className="">
                  <th>{index + 1}</th>
                  <td>{payment?.campName}</td>
                  <td>{payment?.campFees}</td>
                  <td>{payment?.transactionId}</td>
                  <td>{payment?.paymentStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PaymentHistory;
