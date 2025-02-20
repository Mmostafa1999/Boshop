import { Link } from "react-router-dom";
import menCollection from "../../assets/men-collection.jpg";
import MenShoes from "../../assets/men-shoes.jpg";
import Speaker from "../../assets/speaker3.webp";
import Watch2 from "../../assets/watch_2.webp";
import HeaderSection from './../../Shared/HeaderSection';

export default function NewArrival() {
  return (
    <section className="flex flex-col gap-12 my-20 md:mx-auto md:w-11/12  px-4 sm:px-8">
      {/* Section Header */}
      <HeaderSection title="New Arrival" />

      {/* New Arrival Items */}

      <div className="flex flex-col xl:flex-row gap-8 mx-auto text-white w-full">
        {/* Left New Arrival Item */}
        <div className="bg-black rounded-lg overflow-hidden group w-full  mx-auto">
          <div className="relative flex items-center justify-center h-[400px] md:h-[570px]">
            <div className="absolute inset-0">
              <Link to="/products">
                <img
                  loading="lazy"
                  className="w-full h-full object-cover opacity-70 transition duration-300"
                  src={Watch2}
                  alt="Smart Watch"
                />
              </Link>
            </div>
            <div className="absolute z-10 flex flex-col gap-2 p-4 text-center md:text-left items-center md:items-start bottom-0 left-0 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
              <h2 className="text-lg md:text-2xl font-semibold">Smart Watch</h2>
              <p className="text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Repellat, harum!
              </p>
            </div>
          </div>
        </div>

        {/* Right New Arrival Items */}
        <div className="flex flex-col gap-8 w-full">
          {/* Top Right Item */}
          <div className="bg-black rounded-lg overflow-hidden h-[284px]  group">
            <div className="relative flex items-center justify-center h-full">
              <div className="absolute inset-0">
                <Link to="/products">
                  <img
                    loading="lazy"
                    className="w-full h-full object-cover opacity-70 transition duration-300"
                    src={Speaker}
                    alt="Speaker"
                  />
                </Link>
              </div>
              <div className="absolute z-10 flex flex-col gap-2 p-4 text-left bottom-0 left-0 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                <h2 className="text-lg md:text-2xl font-semibold">Speaker</h2>
                <p className="text-sm">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Right Items */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Bottom Right Item 1 */}
            <div className="bg-black rounded-lg overflow-hidden w-full  h-[284px] group">
              <div className="relative flex items-center justify-center h-full">
                <div className="absolute inset-0">
                  <img
                    loading="lazy"
                    className="w-full h-full object-cover opacity-70 transition duration-300"
                    src={MenShoes}
                    alt="Men's Shoes"
                  />
                </div>
                <div className="absolute z-10 flex flex-col gap-2 p-4 text-left bottom-0 left-0 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <h2 className="text-lg md:text-2xl font-semibold">
                    Men&apos;s Shoes
                  </h2>
                  <p className="text-sm">Lorem, ipsum dolor.</p>
                </div>
              </div>
            </div>

            {/* Bottom Right Item 2 */}
            <div className="bg-black rounded-lg overflow-hidden w-full  h-[284px] group">
              <div className="relative flex items-center justify-center h-full">
                <div className="absolute inset-0">
                  <Link to="/allProducts/Perfume">
                    <img
                      loading="lazy"
                      className="w-full h-full object-cover opacity-70 transition duration-300"
                      src={menCollection}
                      alt="Men's Collection"
                    />
                  </Link>
                </div>
                <div className="absolute z-10 flex flex-col gap-2 p-4 text-left bottom-0 left-0 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <h2 className="text-lg md:text-2xl font-semibold">
                    Men&lsquo;s Collection
                  </h2>
                  <p className="text-sm">Lorem, ipsum dolor.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
