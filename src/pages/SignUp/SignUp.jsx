
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import SocialLogin from "../../components/shared/SocialLogin/SocialLogin";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const SignUp = () => {
  const axiosPublic = useAxiosPublic()
  const { handleSignUp, updateUser } = useAuth();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data)
    handleSignUp(data.email, data.password).then((result) => {    
      // create object for update profile 
      const updatedData = {
        displayName: data.name,
        photoURL: data.photo
      }
      // update user function
      updateUser(updatedData)
      .then(() => {
        // create user than save to database
        const userInfo = {
          name: data?.name,
          email: data?.email
        }
        axiosPublic.post('/users', userInfo)
        .then(res => {
          if(res.data.insertedId){
            reset()
            toast.success('user sign up successfully')
            navigate('/')
          }
        })
      
      })
     
    });
  };
  return (
    <>
      <div className="bg-secondary">
        <div className="hero-content flex-col">
       
          <div className="card bg-base-100 w-full max-w-lg shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h1 className="text-2xl font-bold text-center py-2">Sign Up now!</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  {...register("name", { required: true })}
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
                {errors.name?.type && <span>This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="url"
                  name="photo"
                  {...register("photo", { required: true })}
                  placeholder="Name"
                  className="input input-bordered"
                  
                />
                {errors.photo?.type && <span>This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  {...register("email", { required: true })}
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email?.type && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                      message:
                        "Password must include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
                    },
                  })}
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  className="btn bg-primary text-white px-5 py-3 rounded-sm"
                  value="Sign UP"
                />
              </div>
            </form>
            <p className="px-3 text-xs text-center">
              Already Have An Account?{" "}
              <Link to="/login" className="text-red-700 font-bold">
                Login
              </Link>{" "}
              <SocialLogin></SocialLogin>
            </p>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
