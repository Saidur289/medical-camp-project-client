import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic"

const useCamps = (name='' ,filter= '', sort = '') => {
   
    const axiosPublic = useAxiosPublic()
    const {data: camps=[], isLoading}= useQuery({
        queryKey: ['camps',name, filter, sort],
        queryFn: async() => {
            const res = await axiosPublic.get(`/camps?name=${name}&filter=${filter}&sort=${sort}`)
            return res.data
        }
    })
    return [camps, isLoading]
}
export default useCamps