import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic"

const useCount = () => {
    const axiosPublic = useAxiosPublic()
    const {data: count = '',isLoading, refetch } = useQuery({
        queryKey: ['/campCount'],
        queryFn: async() => {
            const res = await axiosPublic.get('/campCount')
            return res.data.count
        }
    })
    return [count, isLoading, refetch]
}
export default useCount