import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";
import { useAuth } from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const JointCampModal = ({ closeModal, isOpen, camp, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const {user} = useAuth()
  const {
    professional,
    campFees,
    location,
    campName,
    _id
  } = camp || {};
  const handleSubmit = async(e) => {
   try{
    e.preventDefault()
    const form = e.target 
    const gender = form.category.value 
    const age = form.age.value 
    const phone = form.phone.value 
    const contact = form.contact.value 
    const participant = {name:user?.displayName, email: user?.email, image: user?.photoURL}
    const participantInfo = {campName, campFees,  gender, age, phone, contact, participant, campId: _id, paymentStatus: 'Unpaid', confirmStatus: 'Pending'}
    // console.log(participantInfo);
    await axiosSecure.post('/participants', participantInfo)
    await axiosSecure.patch(`/update-count/${_id}`, {status: 'increase'})
    toast.success('Join Camp Successfully')
    refetch()
    navigate('/dashboard/registerCamp')


   }
   catch(error){
    toast.error(error.massage)
   }
   finally{
    closeModal()
   }
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Join Camp Now
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Campaigns Name:{campName}{" "}
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    HealthCare Professional: {professional}{" "}
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Location: {location} </p>
                </div>

                <div className="mt-2">
                  <p className="text-sm text-gray-500">Camp Fees:{campFees} </p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Participant Email:{user?.email} </p>
                </div>
                <div className="mt-2 mb-2">
                  <p className="text-sm text-gray-500">Participant  Name:{user?.displayName} </p>
                </div>

                {/* number and contact */}
                <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-1">
                  <div className="space-y-1 text-sm w-1/2">
                    <label htmlFor="quantity" className=" text-gray-600">
                      Phone Number
                    </label>
                    <input
                      className=" px-3 py-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white "
                      name="phone"
                      id="quantity"
                      type="number"
                      placeholder="Available quantity"
                      required
                    />
                  </div>
                  {/* contact */}
                  <div className="space-y-1  text-sm w-1/2">
                    <label htmlFor="name" className="block text-gray-600">
                      Emergency Contact
                    </label>
                    <input
                      className=" px-3 py-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                      name="contact"
                      id="name"
                      type="number"
                      placeholder="Contact"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="space-y-1 text-sm w-1/2">
                    <label htmlFor="quantity" className=" text-gray-600">
                      Gender
                    </label>
                    <select defaultValue={'Select Gender'} name="category" className="select select-bordered select-sm w-full ">
                      <option>
                       Select Gender
                      </option>
                      <option>Male</option>
                      <option>Female</option>
                     
                    </select>
                  </div>
                  {/* age */}
                  <div className="space-y-1  text-sm w-1/2">
                    <label htmlFor="name" className="block text-gray-600">
                      Your Age
                    </label>
                    <input
                      className="px-3 py-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white w-full"
                      name="age"
                      id="name"
                      type="number"
                      min={18}
                      max={50}
                      placeholder="Your Age"
                      required
                    />
                  </div>
                </div>
                <button className="px-4 mt-3 py-2 w-full rounded-sm bg-primary text-white">Join Camp Now</button>
                </form>
               
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default JointCampModal;
