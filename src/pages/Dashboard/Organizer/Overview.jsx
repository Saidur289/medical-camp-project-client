import { useQuery } from "@tanstack/react-query";

const Overview = () => {
    
    const {data:stats, isLoading} = useQuery({
        queryKey: ['admin-stats'],
        queryFn:async() => {
            const res = await  fetch('http://localhost:5000/admin-stats')
            const data = res.json()
            return data
        }
    })
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
    </div>
  );
};

export default Overview;
