import { useForm } from "react-hook-form";
import { FaKitMedical } from "react-icons/fa6";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const image_hosting = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting}`;
const AddCamp = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate()
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    console.log(data);
    if (data?.datetime) {
        const newObject = new Date(data.datetime);
        console.log("Date Object:", newObject);
      } else {
        console.error("Datetime is undefined");
      }
    
    // const newObject = new Date(data?.datetime)
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // send data to database
    if (res.data.success) {
      const campItem = {
        campName: data?.name,
        campFees: parseFloat(data?.campFees),
        professional: data?.profession,
        description: data?.description,
        image: res.data.data.display_url,
        location: data?.location,
        dateTime: new Date(data.datetime),
        participantCount: 0,
      };
      console.table({campItem});
     console.log(res.data.data.display_url);
      const campRes = await axiosSecure.post("/camps", campItem);
      if (campRes.data.insertedId) {
        reset();
        toast.success('Camp Successfully Added');
        navigate('/dashboard/manageCamp')
      }
    }
    // console.log(res.data);
  };
  return (
    <div className="bg-[#eef1fd] md:p-10  md:min-h-screen">
      <h1 className="text-3xl text-primary py-3 text-center">Add A Camp</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            {/* camp name */}
            <div className="label">
              <span className="label-text">Camp Name</span>
            </div>
            <input
                type="text"
                placeholder="Camp Name"
                {...register("name", { required: true })}
                className="input input-bordered w-full "
              />
            {/* Healthcare professional */}
            <div className="label">
              <span className="label-text">HealthCare Profession </span>
            </div>
            <input
              type="text"
              placeholder="Profession Name"
              {...register("profession", { required: true })}
              className="input input-bordered w-full "
            />
          </div>
          <div className="md:flex gap-6">
            {/*camp Fees  */}
            <div className="form-control w-full">
              <div className="label">
                <span className="label-text">Camp Fees</span>
              </div>
              <input
                type="number"
                placeholder="Camp Fees"
                {...register("campFees", { required: true })}
                className="input input-bordered w-full "
              />
            </div>

            {/* Location */}
            <div className="form-control w-full">
              <div className="label">
                <span className="label-text">Location</span>
              </div>
              <input
                type="text"
                placeholder="Location"
                {...register("location", { required: true })}
                className="input input-bordered w-full "
              />
            </div>
          </div>
          <div className="form-control w-full">
            <div className="label">
              <span className="label-text">Camp Description</span>
            </div>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-primary"
              placeholder="Recipe Details"
            ></textarea>
          </div>
          <div className="form-control w-full">
        <div className="label">
          <label htmlFor="datetime">Select Date and Time:</label>
        </div>
        <input
          type="datetime-local"
          defaultValue={new Date()}
          min={new Date()}
          className="input input-bordered w-full"
          name="datetime"
          id="datetime"
          {...register("datetime", { required: "Date and time are required" })}
        />
        {errors.datetime && (
          <p style={{ color: "red" }}>{errors.datetime.message}</p>
        )}
      </div>

          <div className="form-control w-full my-6">
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input w-full "
            />
          </div>
          <button className="px-5 py-3 rounded-md bg-primary text-white flex gap-1 w-full items-center justify-center">
            Add Camp <FaKitMedical className="ml-3 text-myAccent" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCamp;
