import { useState } from "react";
import DeleteModal from "../../../components/Modal/DeleteModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import PaymentModal from "../../../components/Modal/PaymentModal";
import FeedBackModal from "../../../components/Modal/FeedBackModal";


const ParticipantRow = ({camp, refetch}) => {
  // feedback modal function 
  let [isOpens, setIsOpens] = useState(false)
  const closeModals = () => {
   setIsOpens(false)
}
    const axiosSecure = useAxiosSecure()
  const  {campName, campFees, participant, campId, paymentStatus, confirmStatus, _id} = camp || {}
    let [isOpen, setIsOpen] = useState(false)
    let [isPayment, setIsPayment] = useState(false)
  const closeModal = () => setIsOpen(false)
  const paymentClose = () => setIsPayment(false)
  const handleDelete = async() => {
  try{
    await axiosSecure.delete(`/participants/${_id}`)
    await axiosSecure.patch(`/update-count/${campId}`, {status: 'decrease'})
    toast.success('Deleted Successful')
    refetch()

  }
  catch(error){
    toast.error(error.response.message)
  }
  finally{
    closeModal()
  }
  }
    return (
      <>
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
        <td  onClick={() => setIsPayment(true)}  className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <button disabled = {paymentStatus === 'Paid'} className='text-gray-900 whitespace-no-wrap cursor-pointer'>{paymentStatus === 'Unpaid'?'Pay': 'Paid'}</button>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{confirmStatus}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <button
            disabled = {paymentStatus === 'Paid'}
            onClick={() => setIsOpen(true)}
            className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight'
          >
            <span className='absolute cursor-pointer inset-0 bg-myAccent opacity-50 rounded-full'></span>
            <span className='relative cursor-pointer'>Cancel</span>
          </button>
        <PaymentModal camp = {camp} refetch = {refetch} campFees = {campFees} isOpen={isPayment} closeModal={paymentClose}></PaymentModal>
          <DeleteModal handleDelete={handleDelete}  isOpen={isOpen} closeModal={closeModal} />
          <FeedBackModal campName = {campName} closeModal = {closeModals} isOpen = {isOpens}></FeedBackModal>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p onClick={() => setIsOpens(true)} className='text-gray-900 whitespace-no-wrap'>{paymentStatus === 'Paid'? 'Feedback': 'N/A'}</p>
        </td>
  
       
      </tr>
      </>
    );
};

export default ParticipantRow;