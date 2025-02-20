import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="w-full  bg-black py-2 ">
        <div className="container mx-auto ">
          <p className=" text-center text-white py-2">
          Sale Up To 50% Biggest Discounts. Hurry! Limited Perriod Offer
            <span className="fw-bold ml-2">
              <Link className={"underline text-white"} to="/products">
                Shop Now
              </Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
