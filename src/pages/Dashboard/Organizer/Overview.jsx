import { useQuery } from "@tanstack/react-query";
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
import Loading from "../../../components/shared/Loading/Loading";
const Overview = () => {
    
    const {data:stats, isLoading} = useQuery({
        queryKey: ['admin-stats'],
        queryFn:async() => {
            const res = await  fetch('https://my-medical-server.vercel.app/admin-stats')
            const data = res.json()
            return data
        }
    })
    if(isLoading) return <Loading></Loading>
    console.log(stats);
  return (
    <div className="bg-[#eef1fd] md:min-h-screen md:flex flex-col justify-center items-center">
      <div className="stats shadow">
        <div className="stat place-items-center">
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value">{stats?.totalPrice}</div>
         
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Participants</div>
          <div className="stat-value text-secondary">{stats?.totalParticipant}</div>
          
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Total Camps</div>
          <div className="stat-value">{stats?.totalCamps}</div>
        
        </div>
      </div>
      <div className="md:w-1/2 mt-5 z-50">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={stats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis />
                    <YAxis  dataKey="totalUsers"fill="#91ee4c" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalParticipant" fill="#91ee4c" />
                  </BarChart>
                </ResponsiveContainer>
                </div>
    </div>
  );
};

export default Overview;
