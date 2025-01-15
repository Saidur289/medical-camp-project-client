import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const SocialLogin = () => {
    const axiosPublic = useAxiosPublic()
    const { handleLoginGoogle} = useAuth()
    
    const navigate = useNavigate()
    const handleGoogle = () => {
        handleLoginGoogle()
        .then((res) => {
            const userInfo = {
                name: res?.user?.displayName,
                email: res?.user?.email
            }
           
          axiosPublic.post('/users', userInfo)
          .then((res) => {
            navigate('/')
            toast.success('User sign In successfully')
          
            
          })
        
        })
    }
    return (
        <div className="">
            <div className="divider"></div>
           <button onClick={handleGoogle} className="btn w-full  bg-myAccent text-black"><FaGoogle className="mr-2 bg-myAccent text-black"></FaGoogle>Login With Google</button> 
        </div>
    );
};

export default SocialLogin;