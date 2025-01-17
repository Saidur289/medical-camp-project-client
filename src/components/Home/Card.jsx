import { format } from "date-fns";
import { FaCalendar } from "react-icons/fa";
import { Link } from "react-router-dom";

const Card = ({camp}) => {
    const {description, dateTime, campName,campFees, professional, image, location, participantCount, _id} = camp || {}
  return (
    <div className="card bg-base-100 shadow-xl hover:scale-105 overflow-x-hidden">
      <figure>
        <img
          src={image}
          alt="Shoes"
        />
      </figure>
      <p className="flex gap-1 items-center pt-3 pl-2"><FaCalendar className="text-myAccent"></FaCalendar> {format(new Date(dateTime), 'MMM-dd-yyyy h:mm')}</p>
       <div className="divider mt-2 mb-0"></div>
      <div className="space-y-2 relative">
       <div className="flex flex-col space-y-2 pl-2">
       <h2 className="card-title text-primary">{campName}</h2>
        <p>{description.substring(0, 50)}..</p>
        <p>Camp Fees: {campFees}</p>
        <p>Location: {location}</p>
        {/* <p>Healthcare Professional: {professional}</p> */}
        <p>Total Participants: {participantCount}</p>
       </div>
        <div className="mt-auto">
         <Link to = {`/campDetails/${_id}`}> <button className="bg-primary text-white px-5 py-3 rounded-md capitalize transition-colors duration-300 w-full">View Details </button></Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
