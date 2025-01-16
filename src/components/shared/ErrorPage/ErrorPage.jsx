import { Link } from 'react-router-dom';
import pic from '../../../assets/images/pic1.png'
const ErrorPage = () => {
    return (
       <Link to = '/'>
         <div className="md:min-h-screen bg-secondary flex justify-center items-center border-4 shadow-sm">
       
       
         
       <img src={pic} className='md:w-[500px]' alt="" />
  
      
   </div>
       </Link>
    );
};

export default ErrorPage;