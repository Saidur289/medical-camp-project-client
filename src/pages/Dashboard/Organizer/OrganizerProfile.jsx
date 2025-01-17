import { Helmet } from "react-helmet-async";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import UpdateProfileModal from "../../../components/Modal/UpdateProfileModal";

const OrganizerProfile = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () =>{
    setIsOpen(false)
  }
  const axiosSecure = useAxiosSecure();
  const { data: profile = {} , refetch} = useQuery({
    queryKey: ["/users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);

      return res.data;
    },
  });

  const { details, name, email, role } = profile || {};
  console.log(profile.details);
  return (
    <>
      <Helmet>
        <title>Dashboard | Profile</title>
      </Helmet>
      <div className=" bg-[#eef1fd] flex justify-center items-center h-screen overflow-x-hidden py-10">
        <div className="bg-white shadow-lg rounded-2xl md:w-full lg:w-full">
          <div className="flex flex-col items-center justify-center p-4">
            <a href="#" className="relative block">
              {details?.image ? (
                <img
                  alt="profile"
                  src={details?.image}
                  className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
                  referrerPolicy="no-referrer"
                />
              ) : (
                <img
                  alt="profile"
                  src={user?.photoURL}
                  className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
                  referrerPolicy="no-referrer"
                />
              )}
            </a>

            <p className="p-2 px-4 text-xs text-white bg-lime-500 rounded-full">
              {role}
            </p>
            <p className="mt-2 text-xl font-medium text-gray-800 ">
              User Id: {user.uid}
            </p>
            <div className="w-full p-2 mt-4 rounded-lg">
              <div className=" space-y-3 md:flex  md:items-center md:justify-between md:gap-8 text-sm text-gray-600 ">
                <p className="flex flex-col">
                  Name
                  <span className="font-bold text-black ">{name}</span>
                </p>
                <p className="flex flex-col">
                  Email
                  <span className="font-bold text-black ">{email}</span>
                </p>
                <p className="flex flex-col">
                  Phone Number
                  <span className="font-bold text-black ">
                    {details?.phone}
                  </span>
                </p>
                <p className="flex flex-col">
                  Your Age
                  <span className="font-bold text-black ">{details?.age}</span>
                </p>
                <p className="flex flex-col">
                  Emergency Contact
                  <span className="font-bold text-black ">
                    {details?.contact}
                  </span>
                </p>
                <p className="flex flex-col">
                  Gender
                  <span className="font-bold text-black ">
                    {details?.gender}
                  </span>
                </p>

                <div>
                  <button onClick={() => setIsOpen(true)} className="bg-myAccent px-10 py-1 rounded-lg text-black cursor-pointer  block mb-1">
                    Update Profile
                  </button>
                </div>
                <UpdateProfileModal closeModal={closeModal} refetch = {refetch}  isOpen={isOpen} profile={profile}></UpdateProfileModal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizerProfile;
