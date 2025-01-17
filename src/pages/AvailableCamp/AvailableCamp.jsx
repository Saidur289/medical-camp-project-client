import { useState } from "react";
import Card from "../../components/Home/Card";
import useCamps from "../../hooks/useCamps";
import Loading from "../../components/shared/Loading/Loading";
import { Helmet } from "react-helmet-async";

const AvailableCamp = () => {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [name, setName] = useState("");
  const [view, setView] = useState(false);
  const [camps, isLoading] = useCamps(name, filter, sort);
  if (isLoading) return <Loading></Loading>;
  return (
    <>
    <Helmet>
      <title>Available Camp</title>
    </Helmet>
      <div className="bg-[#eef1fd] py-10 overflow-x-hidden">
        <div className="pb-5 text-center space-y-1 justify-center items-center md:pb-10 md:flex md:items-center md:justify-evenly">
          {/* search bar */}
          <div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="grow"
                placeholder="Search By Date"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
          <div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="grow"
                placeholder="Search By Camp Name "
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
          {/* sort option start here */}
          <div className="dropdown dropdown-bottom w-full sm:w-auto ">
            <div
              tabIndex={0}
              role="button"
              className=" px-5 py-3 rounded-md text-white bg-primary"
            >
              Sort By Types
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <a onClick={() => setSort("asc")}>Camp Lowest Fees</a>
              </li>
              <li>
                <a onClick={() => setSort("alpa")}>Camp Name</a>
              </li>
              <li>
                <a onClick={() => setSort("dsc")}>Top Participant</a>
              </li>
            </ul>
          </div>
          {/* change view button */}
          <div>
            <button
              onClick={() => setView(!view)}
              className=" w-full sm:w-auto px-5 py-3 rounded-md bg-primary text-white"
            >
              Change View
            </button>
          </div>
        </div>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 ${
            view && "lg:grid-cols-2 gap-4"
          }`}
        >
          {camps.map((camp, index) => (
            <Card key={index} camp={camp}></Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default AvailableCamp;
