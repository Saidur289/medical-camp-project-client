import { Helmet } from "react-helmet-async";
import AboutUs from "../../components/Home/AboutUs";
import Camps from "../../components/Home/Camps";
import Carousel from "../../components/Home/Carousel";
import Sliders from "../../components/Home/Sliders";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title> Home</title>
            </Helmet>
            <Carousel></Carousel>
            <Camps></Camps>
            <Sliders></Sliders>
            <AboutUs></AboutUs>
        </div>
    );
};

export default Home;