/* eslint-disable react/prop-types */
import aboutUs from "../../assets/about-us.jpg";
import history from "../../assets/history-img.jpg";
import MainButton from "../../Shared/MainButton";
import styles from "./About.module.css";

// Featured card
const FeatureCard = ({ title }) => (
  <div className="group flex flex-col gap-2 rounded-lg cursor-pointer bg-blue-50 px-4 py-8 text-center hover:shadow-lg transition-shadow">
    <dt className="order-last text-lg font-medium text-gray-500">{title}</dt>
  </div>
);

export default function About() {
  const features = [
    {
      title: "Fully Customizable",
    },
    {
      title: "Handcrafted Designs",
    },
    {
      title: "Elegant Looks",
    },
  ];

  return (
    <section className="mt-32">
      {/* History Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:items-center bg-[#fffbf5]">
        {/* History Image */}
        <div className=" w-full h-full ">
          <img
            src={history}
            className="  w-full h-full object-cover "
            alt="history"
          />
        </div>

        {/* History Content */}
        <div className="px-6 py-10 md:px-12 md:py-16 lg:px-20">
          <div className="max-w-xl mx-auto md:max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 leading-snug sm:text-3xl">
              A Brief History of the BoShop
            </h2>

            <div className={`mt-4 ${styles["about-us-content"]}`}>
              <p className="mt-4 text-sm text-[#6f6f6f]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas nibh dolor, efficitur eget pharetra ac, cursus sed
                sapien. Cras posuere ligula ut blandit varius. Nunc consectetur
                scelerisque felis, et volutpat massa aliquam in. sapien.
              </p>

              <p className="mt-4 text-sm text-[#6f6f6f]">
                Consectetur adipiscing elit. Maecenas nibh dolor, efficitur eget
                pharetra ac, cursus sed sapien.
              </p>

              {/* Timeline */}
              <h6 className="relative text-lg font-semibold mt-8">
                1950
                <span className="inline-block h-0.5 w-24 bg-gray-800 mx-2"></span>
                1999
              </h6>
              <p className="mt-2 text-sm text-[#6f6f6f]">
                Lorem ipsum dolor sit amet, efficitur eget pharetra ac, cursus
                sed sapien. Cras posuere ligula ut blandit varius. Nunc
                consectetur scelerisque felis. consectetur adipiscing elit.
                Maecenas nibh dolor
              </p>

              <h6 className="relative text-lg font-semibold mt-8">
                2000
                <span className="inline-block h-0.5 w-24 bg-gray-800 mx-2"></span>
                2025
              </h6>
              <p className="mt-2 text-sm text-[#6f6f6f]">
                Lorem ipsum dolor sit amet, efficitur eget pharetra ac, cursus
                sed sapien. Cras posuere ligula ut blandit varius. Nunc
                consectetur scelerisque felis. consectetur adipiscing elit.
                Maecenas nibh dolor
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:items-center bg-[#fffbf5]">
        {/* Features Content */}
        <div className="px-6 py-10 md:px-12 lg:px-20">
          <div className="max-w-xl mx-auto md:max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 leading-snug sm:text-3xl">
              Fully Customizable Options Look Beautiful in 2025
            </h2>

            <p className="mt-4 text-sm text-[#6f6f6f]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              nibh dolor, efficitur eget pharetra ac, cursus sed sapien. Cras
              posuere ligula ut blandit varius.
            </p>
          </div>

          {/* Feature Cards */}
          <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard key={index} title={feature.title} />
            ))}
          </dl>

          {/* Call-to-Action Button */}
          <MainButton targetLink="/products" btnContent="Order Now" />
        </div>

        {/* Features Image */}
        <div className=" w-full h-full ">
          <img
            src={aboutUs}
            className="  inset-0 w-full h-full object-cover"
            alt="custom"
          />
        </div>
      </div>
    </section>
  );
}
