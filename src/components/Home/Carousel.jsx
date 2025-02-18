import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation ,Autoplay , Pagination } from "swiper/modules";
import bg1 from '../../assets/images/bg-1.jpg'
import bg2 from '../../assets/images/bg-2.jpg'
import bg3 from '../../assets/images/bg-3.jpg'
import Slide from "./Slide";

const Carousel = () => {
  return (
    <div className="container mx-auto ">
      <Swiper  spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'>
        <SwiperSlide>
            <Slide image={bg1} text={'Caring for the Community: Medical Camp 2025'}></Slide>
        </SwiperSlide>
        <SwiperSlide>
            <Slide image={bg2} text={'Bringing Healthcare Closer to You'}></Slide>
        </SwiperSlide>
        <SwiperSlide>
            <Slide image={bg3} text={'Together for Better Health'}></Slide>
        </SwiperSlide>
       
      </Swiper>
    </div>
  );
};

export default Carousel;
