import Card from "./Card";
import useCamps from "../../hooks/useCamps";
import { Link } from "react-router-dom";
import Typewriter from 'typewriter-effect';

const Camps = () => {
  const [camps] = useCamps();
  // console.log(camps);
  return (
    <div className="bg-[#eef1fd] pb-10 border-b-4">
      <h1 className="text-3xl text-center py-5">
        <Typewriter
          options={{
            strings: ["Popular Medical Camps", "Your Health Matters"],
            autoStart: true,
            loop: true,
            delay: 75,
            deleteSpeed: 50,
          }}
        />
       
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 overflow-x-hidden pb-5 md:pb-8">
        {camps.slice(0, 6).map((camp, index) => (
          <Card key={index} camp={camp}></Card>
        ))}
      </div>
      <div className="text-center">
        <Link className="text-center" to="availableCamp">
          <button className="px-5 py-3 rounded-md bg-secondary text-black">
            See All Camps
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Camps;
