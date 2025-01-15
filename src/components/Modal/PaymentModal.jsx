import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
    DialogTitle,
  } from '@headlessui/react'
  import { Fragment } from 'react'
import CheckoutForm from '../Forms/CheckOutForm';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_GATEWAY_KEY)
const PaymentModal = ({closeModal, isOpen, campFees, camp, refetch}) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
               <Dialog as='div' className='relative z-10' onClose={closeModal}>
                 <TransitionChild
                   as={Fragment}
                   enter='ease-out duration-300'
                   enterFrom='opacity-0'
                   enterTo='opacity-100'
                   leave='ease-in duration-200'
                   leaveFrom='opacity-100'
                   leaveTo='opacity-0'
                 >
                   <div className='fixed inset-0 bg-black bg-opacity-25' />
                 </TransitionChild>
         
                 <div className='fixed inset-0 overflow-y-auto'>
                   <div className='flex min-h-full items-center justify-center p-4 text-center'>
                     <TransitionChild
                       as={Fragment}
                       enter='ease-out duration-300'
                       enterFrom='opacity-0 scale-95'
                       enterTo='opacity-100 scale-100'
                       leave='ease-in duration-200'
                       leaveFrom='opacity-100 scale-100'
                       leaveTo='opacity-0 scale-95'
                     >
                       <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                         <DialogTitle
                           as='h3'
                           className='text-lg font-medium leading-6 text-gray-900'
                         >
                           Total Fees: {campFees}
                         </DialogTitle>
                         <div className='mt-2'>
                           <p className='text-sm text-gray-500'>
                             You cannot undo once it&apos;s done!
                           </p>
                         </div>
                         <hr className='mt-8 ' />
                        
                        <Elements stripe={stripePromise}>
                        <CheckoutForm camp={camp} refetch={refetch} campFees = {campFees} closeModal={closeModal}></CheckoutForm>
                        </Elements>
              
                       </DialogPanel>
                     </TransitionChild>
                   </div>
                 </div>
               </Dialog>
             </Transition>
    );
};

export default PaymentModal;