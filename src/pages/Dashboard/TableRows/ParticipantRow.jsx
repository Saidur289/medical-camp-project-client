import { useState } from "react";
import DeleteModal from "../../../components/Modal/DeleteModal";


const ParticipantRow = ({camp}) => {
  const  {campName, campFees, participant, campId, paymentStatus, confirmStatus} = camp || {}
    let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
    return (
        <tr>
        <td className='px-5 pb-5 border-b border-gray-200 bg-white text-sm'>
         {campName}
        </td>
  
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{campFees}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{participant?.name}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{paymentStatus}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{confirmStatus}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <button
            onClick={() => setIsOpen(true)}
            className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight'
          >
            <span className='absolute cursor-pointer inset-0 bg-red-200 opacity-50 rounded-full'></span>
            <span className='relative cursor-pointer'>Cancel</span>
          </button>
  
          <DeleteModal  isOpen={isOpen} closeModal={closeModal} />
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>status</p>
        </td>
  
      
      </tr>
    );
};

export default ParticipantRow;