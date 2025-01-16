import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
const Analytics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: camps = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user.email", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/participants/${user?.email}`);
      return res.data;
    },
  });

  return (
    <>
     <Helmet>
      <title>DashBoard | Analytics</title>
    </Helmet>
      <div className="bg-[#eef1fd] md:min-h-screen flex flex-col justify-center items-center space-y-3">
        <h1 className="text-3xl text-primary text-center py-3">
          Your Participant Graph
        </h1>
        <div className="md:w-full">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={camps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="campName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="campFees" fill="#91ee4c" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Analytics;
