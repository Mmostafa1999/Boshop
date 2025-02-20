/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Spinner from "../../Shared/Spinner";
import "./Brands.module.css";

var settings = {
  dots: false,
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 2000,
  cssEase: "linear",

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
const BrandsLogo = ({ image }) => (
  <Link to="/">
    <div className="relative group h-[150px] overflow-hidden rounded-md shadow-lg">
      {/* Category Image */}
      <img
        src={image}
        className=" w-full h-full object-cover  group transition-transform duration-300 group-hover:scale-110"
      />
    </div>
  </Link>
);
export default function Brands() {
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState([]);

  async function getBrands() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands`,
      );
      setBrands(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <section className="overflow-hidden mt-10">
      {isLoading ? (
        <Spinner />
      ) : (
        <Slider className="slider-container" {...settings}>
          {brands.map(category => (
            <BrandsLogo key={category._id} image={category.image} />
          ))}
        </Slider>
      )}
    </section>
  );
}
