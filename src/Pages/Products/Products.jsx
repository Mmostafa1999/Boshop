import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ProductCard from "../../components/ProductCard/ProductCard";
import HeaderSection from "../../Shared/HeaderSection";
import Spinner from "../../Shared/Spinner";
import ToastMessage from "../../Shared/ToastMessage";
import useProducts from "./../../Hooks/useProducts";
import "./Products.module.css";

export default function Products() {
  const { data, isLoading, isError } = useProducts();
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const PRODUCTS_DISPLAY_LIMIT = 5;

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  // handle error
  if (isError) {
    toast.error("An error occurred while loading products!");
    return <ToastMessage />;
  }

  const handleViewAll = () => setShowAll(true);

  return (
    <section className="mt-40">
      <HeaderSection title="All Products" />

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 md:w-2/3 mx-auto mt-10">
          {products
            .slice(0, showAll ? products?.length : PRODUCTS_DISPLAY_LIMIT)
            .map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}

      <div className="text-center flex flex-col md:flex-row justify-center align-baseline my-10 md:gap-20">
        <Link to="/">
          <button className="bg-[var(--main-color)] text-white py-2 px-6  rounded hover:bg-red-600">
            Back To Home Page
          </button>
        </Link>

        {!showAll && products?.length > PRODUCTS_DISPLAY_LIMIT && (
          <button
            onClick={handleViewAll}
            className="bg-[var(--main-color)] text-white py-2 px-6  rounded flex  w-auto  hover:bg-red-600">
            View All Items
          </button>
        )}
      </div>
    </section>
  );
}
