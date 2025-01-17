import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
    DialogTitle,
  } from "@headlessui/react";
  import { Fragment, useState } from "react";
  import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const UpdateProfileModal = ({closeModal, isOpen, profile,  refetch}) => {
  const [loading, setLoading] = useState(false)
    const { details, name, email, role } = profile || {};
    const axiosSecure = useAxiosSecure()
    const {user, updateUser} = useAuth()
    const handleSubmit = async(e) => {
        setLoading(true)
        try{
         e.preventDefault()
        
         const form = e.target 
         const gender = form.category.value 
         const age = form.age.value 
         const phone = form.phone.value 
         const contact = form.contact.value 
         const imageUrl = form.image.value
         const details = {image: imageUrl, gender, age, phone,contact}
         const updatedData = {
          displayName: name,
          photoURL: imageUrl,
        }
         
        const {data} = await axiosSecure.patch(`/update-profile/${user?.email}`, details) 
        console.log(data);
          updateUser(updatedData)
          .then(() => {
            console.log( 'kere kemon');
            toast.success('updated profile Successfully')
       
            refetch()
          })
        
         
        
        
     
        }
        catch(error){
         toast.error(error.massage)
        }
        finally{
         setLoading(false)
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
                  className="text-lg font-medium text-center leading-6 text-primary"
                >
                  Update Contact Details
                </DialogTitle>

                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Participant Email : {user?.email}
                  </p>
                </div>
                <div className="mt-2 mb-2">
                  <p className="text-sm text-gray-500">
                    Your Name : {user?.displayName}
                  </p>
                </div>
              

                {/* phone */}
                <form onSubmit={handleSubmit}>
                  <div className="space-y-1 text-sm ">
                    <label htmlFor="rating" className=" text-gray-600">
                      Phone Number
                    </label>
                    <input
                      className=" px-3 py-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white w-full"
                      name="phone"
                      id="quantity"
                      type="number"
                      placeholder="Phone Number"
                      defaultValue={details?.phone ? details.phone : 'N/A'}
                      required
                    />
                  </div>
                  <div className="space-y-1 text-sm ">
                    <label htmlFor="rating" className=" text-gray-600">
                      Emergency Number
                    </label>
                    <input
                      className=" px-3 py-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white w-full"
                    defaultValue={details?.contact ? details.contact : 'N/A'}
                    
                      name="contact"
                      id="quantity"
                      type="number"
                      placeholder="Contact Number"
                     
                      required
                    />
                  </div>
                  {/* description */}
                  <div className="space-y-1 text-sm ">
                    <label htmlFor="rating" className=" text-gray-600">
                      Your Age
                    </label>
                    <input
                      className=" px-3 py-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white w-full"
                      name="age"
                      id="quantity"
                      type="number"
                      defaultValue={details?.age ? details.age : 'N/A'}
                      min={18}
                      max={50}
                      placeholder="Your Age"
                      required
                    />
                  </div>
                  <div className="space-y-1 text-sm">
                    <label htmlFor="quantity" className=" text-gray-600">
                      Gender
                    </label>
                    <select  defaultValue={details?.gender ? details.gender : 'N/A'} name="category" className="select select-bordered select-sm w-full ">
                      <option>
                       Select Gender
                      </option>
                      <option>Male</option>
                      <option>Female</option>
                     
                    </select>
                  </div>
                  <div className="space-y-1 text-sm">
                    <label htmlFor="quantity" className=" text-gray-600">
                      Photo URL
                    </label>
                    <input
                      className=" px-3 py-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white w-full"
                      name="image"
                      id="quantity"
                      type="url"
                      placeholder="Photo URL"
                      defaultValue={details?.image ? details.image : 'N/A'}
                      required
                    />
                  </div>
                  <button className="px-4 mt-3 py-2 w-full rounded-sm bg-primary text-white">
                    Update Now
                  </button>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdateProfileModal;
