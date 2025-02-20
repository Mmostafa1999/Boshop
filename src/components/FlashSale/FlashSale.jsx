import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductSale from "../../assets/product-sale.png";
import "./FlashSale.module.css";

const calculateTimeLeft = deadline => {
  const difference = +new Date(deadline) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const getNextWeekDeadline = () => {
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  nextWeek.setHours(23, 59, 59, 999);
  return nextWeek;
};

export default function FlashSale() {
  const [deadline, setDeadline] = useState(getNextWeekDeadline());
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(deadline));

  useEffect(() => {
    const timer = setInterval(() => {
      const remainingTime = calculateTimeLeft(deadline);
      setTimeLeft(remainingTime);

      if (Object.keys(remainingTime).length === 0) {
        setDeadline(getNextWeekDeadline()); // Reset the timer
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  return (
    <div className="p-4 md:p-10 lg:p-14 my-10 flex flex-col md:flex-row justify-between items-center bg-gray-100 ">
      {/* Left Section */}
      <div className="flex-1 md:leading-loose text-center md:text-left text-2xl md:text-4xl">
        <h3 className="text-gray-400">Clothings Hot</h3>
        <h2 className="font-bold my-2">Shoe Collection</h2>
        <h3 className="text-gray-400">Accessories</h3>
      </div>

      {/* Center Section */}
      <div className="flex-1 flex flex-col items-center relative">
        <img src={ProductSale} alt="Product" className="w-full h-auto" />
        <div className="absolute flex flex-col top-0 right-10 bg-black text-white text-sm p-5 text-center  rounded-full">
          Sale Of <span className="font-extrabold text-lg">$29.99</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col gap-4 text-center md:text-center">
        <h4 className="text-red-500 text-xl font-bold">DEAL OF THE WEEK</h4>
        <h2 className="text-2xl md:text-4xl md:leading-loose font-bold">
          Multi-pocket Chest Bag Black
        </h2>
        <div className="flex flex-wrap justify-center md:justify-between space-x-4 md:space-x-0 text-lg">
          <div className="flex flex-col items-center ">
            <span className="block font-extrabold mb-2 text-2xl md:text-4xl">
              {timeLeft.days}
            </span>
            <span className="text-sm text-gray-600">Days</span>
          </div>
          <div className="flex flex-col items-center ">
            <span className="block font-extrabold mb-2 text-2xl md:text-4xl">
              {timeLeft.hours}
            </span>
            <span className="text-sm text-gray-600">Hours</span>
          </div>
          <div className="flex flex-col items-center ">
            <span className="block font-extrabold mb-2 text-2xl md:text-4xl">
              {timeLeft.minutes}
            </span>
            <span className="text-sm text-gray-600">Minutes</span>
          </div>
          <div className="flex flex-col items-center ">
            <span className="block font-extrabold mb-2 text-2xl md:text-4xl">
              {timeLeft.seconds}
            </span>
            <span className="text-sm text-gray-600">Seconds</span>
          </div>
        </div>
        <Link to="/">
          <button className="mt-4 px-6 py-2 w-fit mx-auto md:mx-0 bg-black text-white rounded-md hover:bg-red-500 transition">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
}
