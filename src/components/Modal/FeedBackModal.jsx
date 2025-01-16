import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
    DialogTitle,
  } from "@headlessui/react";
  import { Fragment } from "react";
  import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const FeedBackModal = ({closeModal, isOpen, campName}) => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const handleFeedback = async(e) => {
      try{
        e.preventDefault()
        const form = e.target 
        const rating = parseInt(form.rating.value) 
        const reviewText = form.description.value 
        const profileImage = user?.photoURL 
        const userName = user?.displayName 
        const data = {rating, reviewText, profileImage, userName}
        console.log(data);
        await axiosSecure.post('/feedback', data)
        toast.success('Feedback Added Successfully')

      }
      catch(error){
        toast.error(error.message)
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
                  className="text-lg font-medium text-center leading-6 text-primary"
                >
                  Write Feedback Now
                </DialogTitle>

                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Participant Email:{user?.email}{" "}
                  </p>
                </div>
                <div className="mt-2 mb-2">
                  <p className="text-sm text-gray-500">
                    Participant Name:{user?.displayName}{" "}
                  </p>
                </div>
                <div className="mt-2 mb-2">
                  <p className="text-sm text-gray-500">
                    Camp Name:{campName}{" "}
                  </p>
                </div>

                {/* rating */}
                <form onSubmit={handleFeedback}>
                  <div className="space-y-1 text-sm ">
                    <label htmlFor="rating" className=" text-gray-600">
                      Rating
                    </label>
                    <input
                      className=" px-3 py-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white w-full"
                      name="rating"
                      id="quantity"
                      type="number"
                      placeholder="Rating"
                      min={1}
                      max={5}
                      required
                    />
                  </div>
                  {/* description */}
                  <div className="space-y-1 flex flex-col gap-1">
                    <label htmlFor="name" className="block text-gray-600">
                      Description
                    </label>
                    <textarea
                      
                      className="textarea textarea-primary  px-3 py-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white w-full"
                      placeholder="Description" name="description"
                    ></textarea>
                  </div>

                  <button className="px-4 mt-3 py-2 w-full rounded-sm bg-primary text-white">
                    Feedback Now
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

export default FeedBackModal;
