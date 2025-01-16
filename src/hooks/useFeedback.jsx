import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic"

const useFeedback = () => {
    const axiosPublic = useAxiosPublic()
    const {data: slideData = [], refetch}  = useQuery({
        queryKey: ['feedback'],
        queryFn: async() => {
            const res = await axiosPublic.get('feedback')
            return res.data
        }
    })
    return [slideData, refetch]
}
export default useFeedback