

const Slide = ({image, text}) => {
    return (
        <div className="w-full bg-center bg-cover object-cover h-[400px] md:h-[700px]" style={{backgroundImage: `url(${image})`}}>
            <div className="flex items-center justify-center w-full h-full bg-gray-900/70">
            <div className="text-center">
                <h1 className="text-2xl font-semibold text-white lg:text-4xl">
                    {text}
                </h1>
                <br />
                <button className="bg-primary text-white px-5 py-3 rounded-md capitalize transition-colors duration-300">All Campaigns</button>

            </div>

            </div>
            
        </div>
    );
};

export default Slide;