import { FaEnvelope, FaMapMarkedAlt, FaPhone } from "react-icons/fa";
import { useRef } from "react";
import Swal from "sweetalert2";

const Contact = () => {
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault(); // Prevents page reload on form submission
    
        emailjs
          .sendForm(
            'service_3zj9tzk', // Replace with your EmailJS service ID
            'template_t1b4kvz', // Replace with your EmailJS template ID
            form.current, // Form reference
            'DQ7UJsdXXxQ7kkqxn' // Replace with your EmailJS public key
          )
          .then(
            (result) => {
            //   console.log('Send Message Successfully!', result.text); // Log success message
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Send Message Successfully",
                showConfirmButton: false,
                timer: 1500
              });
              form.current.reset();
              
            },
            (error) => {
              console.log('FAILED...', error.text); // Log error message
            }
          );
      };
    return (
       <div className='bg-[#eef1fd]  text-black py-12' id="contacts">
             <div className='container mx-auto px-8 md:px-16 lg:24'>
               <h2 className='text-4xl font-bold text-center mb-12'>Contact Us</h2>
               <div className='flex flex-col md:flex-row items-center md:space-x-12'>
                
               <div className='flex-1'>
               <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-4">Let&apos;s Talk</h1>
               <p>I am open to discussing web development projects or  job opportunities.</p>
               <div className="mb-4 mt-8">
               <FaEnvelope className="inline-block text-green-400 mr-2"></FaEnvelope>
               <a href="" className="hover:underline">saidur.riaz1@gmail.com</a>
  
               </div>
               <div className="mb-4 ">
               <FaPhone className="inline-block text-green-400 mr-2"/>
              <span>+8801533393421</span>

               </div>
               <div className="mb-4 ">
               <FaMapMarkedAlt className="inline-block text-green-400 mr-2"/>
              <span>Chattogram, Bangladesh</span>

               </div>
               
               </div>
               <div className="flex-1 w-full">
                <form ref={form} onSubmit={sendEmail} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-2">Your Name</label>
                        <input type="text" name="user_name" placeholder="Your Name" className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-green-400" />
                    </div>
                    <div>
                        <label htmlFor="email" name="user_email" className="block mb-2">Email</label>
                        <input placeholder="Your Email" type="email" className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-green-400" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block mb-2">Message</label>
                        <textarea rows={'5'} name="message"  placeholder="Enter Your Message" type="email" className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-green-400" />
                    </div>
                    <button className="bg-primary text-white px-5 py-3 rounded-md capitalize transition-colors duration-300 w-full">Send</button>
                </form>
               </div>
               </div>
             </div>
           </div>
    );
};

export default Contact;