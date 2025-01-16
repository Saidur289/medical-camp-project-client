import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic"

const useParticipantCount = () => {
    const axiosPublic = useAxiosPublic()
    const {data: count = '',isLoading, refetch } = useQuery({
        queryKey: ['/participantCount'],
        queryFn: async() => {
            const res = await axiosPublic.get('/participantCount')
            return res.data.count
        }
    })
    return [count, isLoading, refetch]
}
export default useParticipantCount