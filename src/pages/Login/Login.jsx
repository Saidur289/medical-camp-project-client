import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import SocialLogin from '../../components/shared/SocialLogin/SocialLogin';
import toast from 'react-hot-toast';


const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
   const {handleSingIn} = useContext(AuthContext)
   
    const handleLogin = e => {
        e.preventDefault()
        const form = e.target 
        const email = form.email.value 
        const password = form.password.value 
        handleSingIn(email, password)
        .then((result) => {
          console.log(result.user);
          toast.success('Sign In Successfully')
          
        });
        navigate(location?.state? location?.state: '/')

    }
   
    
    return (
      //   <div className="hero">
      //   <div className="hero-content flex-col">
        
      //     <div className="card  w-full max-w-sm  shadow-2xl">
      //       <form onSubmit={handleLogin} className="card-body">
      //         <div className="form-control">
      //           <label className="label">
      //             <span className="label-text">Email</span>
      //           </label>
      //           <input type="email" name='email' placeholder="email" className="input input-bordered" required />
      //         </div>
      //         <div className="form-control">
      //           <label className="label">
      //             <span className="label-text">Password</span>
      //           </label>
      //           <input type="password" name='password' placeholder="password" className="input input-bordered" required />
              
      //         </div>
      //         <div className="form-control mt-6">
      //           <input type="submit"  value="Login" className='btn text-white btn-primary' />
      //         </div>
      //       </form>
      //       <p className='p-3 text-xs text-center'>Do Not Have An Account? <Link to = '/signup' className='text-red-700 font-bold'>Sign Up</Link> </p>
      //       <SocialLogin></SocialLogin>
      //     </div>
      //   </div>
      // </div>
      <div className="hero  bg-blue-400 text-black">
  <div className="hero-content flex-col lg:flex-row-reverse lg:justify-between">
    {/* Login Card */}
    <div className="card w-full max-w-sm bg-white shadow-xl text-black rounded-lg">
      <h2 className="text-2xl font-bold text-center mt-2 text-primary">Login Now !</h2>
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-secondary">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="input input-bordered focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div className="form-control mt-1">
          <label className="label">
            <span className="label-text font-semibold text-secondary">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="input input-bordered focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <label className="label">
            <Link to="/forgot-password" className="label-text-alt link link-hover text-primary">
              Forgot password?
            </Link>
          </label>
        </div>
        <div className="form-control mt-1">
          <input
            type="submit"
            value="Login"
            className="btn bg-primary hover:bg-primary/90 border-0 text-white"
          />
        </div>
      </form>
      <p className="p-4 text-sm text-center">
        Don't have an account?{" "}
        <Link to="/signup" className="text-primary font-bold hover:underline">
          Sign Up
        </Link>
      </p>
      <div className="divider mb-2 mt-0">OR</div>
      <div className="p-3">
        <SocialLogin></SocialLogin>
      </div>
    </div>
  </div>
</div>

    );
};

export default Login;