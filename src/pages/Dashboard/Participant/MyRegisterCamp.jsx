import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ParticipantRow from "../TableRows/ParticipantRow";


const MyRegisterCamp = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const {data: camps=[], isLoading, refetch} = useQuery({
        queryKey: ['user.email', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/participants/${user?.email}`)
            return res.data
        }
    })
    console.log(camps);
    return (
        <div className="bg-[#eef1fd] md:min-h-screen">
            <h1 className="text-primary text-3xl text-center py-3"><span>Hi, Welcome To Your Register Camp</span></h1>
            <div className='px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Camp Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Camp Fees
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Participant Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Payment Status
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Confirmation Status
                    </th>
                    
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Action
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      FeedBack
                    </th>

                  </tr>
                </thead>
                <tbody>
                    {camps.map((camp) =>  <ParticipantRow key={camp._id} camp = {camp} refetch={refetch}></ParticipantRow>)}
              
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
            
        </div>
    );
};

export default MyRegisterCamp;