import { useQuery } from "@tanstack/react-query"
import { useAuth } from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"

const useAdmin = () => {
    const {user, loading} = useAuth()
    const axiosSecure = useAxiosSecure()
    const {data: isAdmin, isLoading} = useQuery({
        queryKey: ['isAdmin',user?.email ],
        enabled:!!user && !loading,
        queryFn: async() => {
            const res = await axiosSecure.get(`/admin-user/${user?.email}`)
            // console.log(res.data);
            return res?.data?.admin
        }
    })
    return [isAdmin, isLoading]
}
export default useAdmin