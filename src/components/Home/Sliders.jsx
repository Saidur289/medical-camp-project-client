import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import { Fade } from "react-awesome-reveal";
import Feedback from "./Feedback";
import useFeedback from "../../hooks/useFeedback";

const  Sliders = () => {
    const [slideData] = useFeedback()
    return (
      <div  className="container mx-auto px-5 py-20 bg-secondary ">
        <h1 className="text-black font-bold text-3xl text-center pb-5">Customer Review</h1>
        <Swiper
          slidesPerView={3}
          spaceBetween={50}
          // effect="fade"
          // fadeEffect = { {crossFade: true} }
          breakpoints={{
                // When the window is >= 640px
              540:{
               slidesPerView : 1,
               spaceBetween : 20,
              },
              340:{
               slidesPerView : 1,
               spaceBetween : 20,
              },
              640:{
               slidesPerView : 1,
               spaceBetween : 20,
              },
              768:{
                  slidesPerView: 2,
                  spaceBetween: 40,
              },
              1024:{
                  slidesPerView: 3,
                  spaceBetween: 50
              }
  
          }}
          loop={true}
          autoplay= {{
              delay:5000,
              disableOnInteraction:false
          }}
          scrollbar={false}
          pagination={{
            clickable: true,
          }}
          
          modules={[Pagination, Autoplay, EffectFade]}
          className="mySwiper"
        >
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
          {slideData.map((slide, index) => (
            < SwiperSlide key={index}>
              <Fade cascade delay={100}>
              <Feedback
                userName={slide.userName}
                rating={slide.rating}
                profileImage={slide.profileImage}
                reviewText={slide.reviewText}
              ></Feedback>
              </Fade>
            </ SwiperSlide>
          ))}
          </div>
        </Swiper>
      </div>
    );
  }
  export default Sliders