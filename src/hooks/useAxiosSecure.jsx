import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useEffect } from "react";

 const axiosSecure = axios.create({
    baseURL: 'https://my-medical-server.vercel.app',
    withCredentials: true
 })
const useAxiosSecure = () => {
  const navigate = useNavigate()
  const { handleSignOut} = useAuth()
  useEffect(() => {
    axiosSecure.interceptors.response.use(res => {
      return res 
    }, async error => {
      // console.log('Error caught from insterceptors');
      if(error.res?.status === 401 || error.response?.status === 403){
        // logout
      await  handleSignOut()
        navigate('/login')
      }
      return Promise.reject(error)
    })
  }, [handleSignOut, navigate])
  return axiosSecure

};

export default useAxiosSecure;