import { useEffect, useState } from "react";
import Slider from "react-slick";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import UseProducts from "../../Hooks/UseProducts";
import Spinner from "../../Shared/Spinner";
import ToastMessage from "../../Shared/ToastMessage";
import ProductCard from "../ProductCard/ProductCard";
import HeaderSection from "./../../Shared/HeaderSection";
import "./SaleProducts.module.css";
import sliderSettings from "../../Shared/SliderSettings";


export default function SaleProducts() {
  const [saleProducts, setSaleProducts] = useState([]);

  const { data, isLoading, isError } = UseProducts();
  
  useEffect(() => {
    const filteredProducts = data?.filter(
      product => product.priceAfterDiscount,
    );
    setSaleProducts(filteredProducts);
  }, [data]);

  // handle error
  if (isError) {
    toast.error("An error occurred while loading products!");
    return <ToastMessage />;
  }

  return (
    <section>
      <HeaderSection title="Hot Sales" />

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="mt-10 w-11/12 mx-auto">
          <Slider {...sliderSettings}>
            {saleProducts?.map(product => (
              <div key={product._id} className="px-2">
                <ProductCard
                  key={product._id}
                  className="px-2"
                  product={product}
                  isOnSale={true}
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </section>
  );
}
