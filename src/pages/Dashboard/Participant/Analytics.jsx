
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
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
//   const data = [
//     {
//       name: "Page A",
//       uv: 4000,
//       pv: 2400,
//     },
//     {
//       name: "Page B",
//       uv: 3000,
//       pv: 1398,
//     },
//     {
//       name: "Page C",
//       uv: 2000,
//       pv: 9800,
//     },
//     {
//       name: "Page D",
//       uv: 2780,
//       pv: 3908,
//     },
//     {
//       name: "Page E",
//       uv: 1890,
//       pv: 4800,
//     },
//     {
//       name: "Page F",
//       uv: 2390,
//       pv: 3800,
//     },
//     {
//       name: "Page G",
//       uv: 3490,
//       pv: 4300,
//     },
//   ];
  return (
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
  );
};

export default Analytics;
