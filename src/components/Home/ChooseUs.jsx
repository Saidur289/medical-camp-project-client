import { Fade } from 'react-awesome-reveal';
import { FaCar, FaDollarSign, FaHeadset, FaMousePointer } from 'react-icons/fa';
import { FaKitMedical } from 'react-icons/fa6';
const ChooseUs = () => {
    return (
        <section className="bg-[#eef1fd]  pb-12">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
      <Fade duration={10}>
      <h2 className="text-black text-3xl font-bold text-center  py-8">Why Choose Us</h2>
      </Fade>
        <Fade cascade delay={100}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white shadow-lg hover:shadow-xl p-6 rounded-lg text-center">
            <div className="text-indigo-600 text-4xl mb-4 flex flex-col items-center justify-center">
              <FaKitMedical />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Wide Variety of Camps</h3>
            <p className="text-gray-600">From budget-friendly options to very good camps, find the perfect way for every people.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-lg hover:shadow-xl p-6 rounded-lg text-center">
            <div className="text-indigo-600 text-4xl mb-4 flex flex-col items-center justify-center">
              <FaDollarSign />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Affordable Camps</h3>
            <p className="text-gray-600">Enjoy competitive daily rates with no hidden fees for worry-free camps.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-lg hover:shadow-xl p-6 rounded-lg text-center">
            <div className="text-indigo-600 text-4xl mb-4 flex flex-col items-center justify-center">
              <FaMousePointer />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Easy Booking Process</h3>
            <p className="text-gray-600">Book your camps in just a few clicks with our seamless online system.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white shadow-lg hover:shadow-xl p-6 rounded-lg text-center">
            <div className="text-indigo-600 text-4xl mb-4 flex flex-col items-center justify-center">
              <FaHeadset />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">24/7 Customer Support</h3>
            <p className="text-gray-600">Our team is here round-the-clock to assist you with any queries or concerns.</p>
          </div>
        </div>
        </Fade>
      </div>
    </section>
    );
    
};
export default ChooseUs