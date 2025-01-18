import logo1 from "../../assets/images/icons8-medical-100.png";
import logo2 from "../../assets/images/icons8-home-100.png";
import imgage from "../../assets/images/Abortion-amico.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: false,    
    });
  }, []);
  return (
    <div data-aos="fade-up" data-aos-anchor-placement="top-center">
      <div className=" md:text-left md:flex md:items-center border-2">
        <div className=" md:w-1/2 py-10">
          {/* content  */}
          <h1 className="text-3xl font-bold py-5 text-center md:text-left">
            About Us
          </h1>
          <p className="pb-5 text-center md:text-left">
            Your life is our specialty. Our team of experienced physicians
            offers a comprehensive range of healthcare services.
          </p>
          <div className="pl-5 md:pl-0 flex flex-col  md:text-left space-y-5">
            <div className="flex gap-5 items-center">
              <div>
                <img src={logo1} className="w-10" alt="" />
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold">Experted Doctors</h1>
                <p>
                  Our team of physicians treats patients of all ages, from
                  infants to seniors.
                </p>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <div>
                <img src={logo2} className="w-10" alt="" />
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold">Healthy Environment</h1>
                <p>
                  We have experienced nursing team and good beds for healthy
                  environment..
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* image  */}
        <div className="md:w-1/2 py-10">
          <img
            src={imgage}
            className="md:h-[400px] w-full object-cover"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
