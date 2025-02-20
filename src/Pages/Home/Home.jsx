import Banner from "../../components/Banner/Banner";
import Brands from "../../components/Brands/Brands";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import Features from "../../components/Features/Features";
import FlashSale from "../../components/FlashSale/FlashSale";
import NewArrival from "../../components/NewArrival/NewArrival";
import SaleProducts from "../../components/SaleProducts/SaleProducts";
import "./Home.module.css";

export default function Home() {
  return (
    <>
      <Banner />
      <Features />
      <div className="w-full ">
        <CategoryCard />
        <NewArrival />
        <SaleProducts />
        <FlashSale />
        <Brands />
      </div>
    </>
  );
}
