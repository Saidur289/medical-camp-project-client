import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { format } from "date-fns";
import { FaCalendarCheck, FaDollarSign } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import JointCampModal from "../../components/Modal/JointCampModal";

const CampDetails = () => {
    const {user} = useAuth()
    const navigate = useNavigate()
    let [isOpen, setIsOpen] = useState(false)
    const axiosPublic = useAxiosPublic()
    const {id} = useParams()
    const {data: camp={}, refetch} = useQuery({
        queryKey: ['camp/id', id],
        queryFn: async() => {
            const {data} = await axiosPublic.get(`/camps/${id}`)
            return data
        }
    })
    const closeModal = () => {
        setIsOpen(false)
    }
    const handleOpen = () => {
       if(!user){
        toast.error('Please Login')
        navigate('/login')
       }
       setIsOpen(true)
    }
   
    const {description, professional, dateTime, image, campFees, location, campName} = camp || {}
    return (
        <div className="flex flex-col md:flex-row items-start gap-6 p-4 bg-white shadow-lg rounded-lg">
        {/* Left: Image */}
        <div className="flex-1">
          <img
            src={image}
            alt="Car Model"
            className="w-full md:h-[450px] rounded-lg object-cover"
          />
        </div>
  
        {/* Right: Details */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-3">Campaigns Name:  {campName}</h2>
          <h2 className="text-xl mb-3">HealthCare Profession: {professional}</h2>
          <h2 className="text-normal  mb-3">Location: {location}</h2>
  
          <div className="flex items-center mb-2">
            <FaDollarSign className="text-blue-500 mr-2" />
            <p className="text-normal ">Camps Fees: ${campFees}</p>
          </div>
  
        
          <div className="flex items-center mb-2">
            <FaCalendarCheck className="text-myAccent mr-2" />
            <p className="text-normal font-semibold">Campaigns Date: {dateTime && format(new Date(dateTime), 'MMM-dd-yyy h:mm')}</p>
          </div>
  
          
  
          <div className="mb-4">
          <div className="divider"></div>
            <p className="text-gray-700">
               
            {description}
            </p>
            <div className="divider"></div>
          </div>
  
          {/* Book Now Button */}
          <button  onClick={() => handleOpen()} className="bg-primary text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition">
            Join Camp
          </button>
        </div>
       <JointCampModal refetch={refetch} camp = {camp} closeModal = {closeModal} isOpen = {isOpen}></JointCampModal>
      </div>
    );
};

export default CampDetails;