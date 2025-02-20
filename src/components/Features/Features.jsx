/* eslint-disable react/prop-types */
import HeaderSection from "../../Shared/HeaderSection";
import "./Features.module.css";

const FeatureCard = ({ icon, title, subTitle }) => (
  <div className="group flex flex-col gap-2 rounded-lg cursor-pointer bg-[#002c3e]  transition duration-500 hover:-translate-y-2 text-white px-4 py-16 text-center">
    <dt className="order-last text-lg font-bold group-hover:text-white">
      {title}
    </dt>
    <dt className="order-last text-sm font-light group-hover:text-white">
      {subTitle}
    </dt>
    <dd className="text-4xl font-extrabold md:text-5xl">{icon}</dd>
  </div>
);

export default function Features() {
  const features = [
    {
      icon: <i className="fa-solid fa-truck"></i>,
      title: "Free Shipment Over 50$",
      subTitle: "variations of passages of Lorem Ipsum available"

    },
    {
      icon: <i className="fa-solid fa-headphones-simple"></i>,
      title: "24/7 Online Support",
      subTitle: "variations of passages of Lorem Ipsum available"
    },
    {
      icon: <i className="fa-solid fa-money-check-dollar"></i>,
      title: "100% Secure Payment",
      subTitle: "variations of passages of Lorem Ipsum available"
    },
    {
      icon: <i className="fa-solid fa-globe"></i>,
      title: "World Wide Shipment",
      subTitle: "variations of passages of Lorem Ipsum available"
    },
  ];

  return (
    <section className="my-10">
      <div className="mx-auto  max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
       <HeaderSection title="Why Shop With Us" />

        <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              subTitle={feature.subTitle}
            />
          ))}
        </dl>
      </div>
    </section>
  );
}
