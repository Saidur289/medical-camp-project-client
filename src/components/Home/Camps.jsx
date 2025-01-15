import { useEffect, useState } from "react";
import Card from "./Card";
import useCamps from "../../hooks/useCamps";


const Camps = () => {
   const [camps] = useCamps()
    return (
        <div className="bg-[#eef1fd]">
            <h1 className="text-3xl text-center">Popular Medical Camps</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {
               camps.map((camp, index) => <Card key={index} camp = {camp}></Card>)
                }

            </div>
            
        </div>
    );
};

export default Camps;