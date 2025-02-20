import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UseProducts from "../../Hooks/UseProducts";
import MainButton from "../../Shared/MainButton";
import Spinner from "../../Shared/Spinner";
import ToastMessage from "../../Shared/ToastMessage";
import CategoriesDropdown from "../../components/CategoryCard/CategoriesDropdown";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Categories.module.css";

export default function Categories() {
  const categories = [
    { id: 1, name: "Men's Fashion" },
    { id: 2, name: "Women's Fashion" },
    { id: 3, name: "Electronics" },
  ];
  const { categoryName } = useParams();
  const {
    data: filteredProducts,
    isLoading,
    isError,
  } = UseProducts({
    category: categoryName,
  });
  const [showAll, setShowAll] = useState(false);
  const PRODUCTS_DISPLAY_LIMIT = 5;

  // Toggle displaying all products or limited products
  const handleViewAll = () => setShowAll(true);

  if (isError) {
    toast.error("An error occurred while loading products!");
    return <ToastMessage />;
  }

  return (
    <section className="w-11/12 mx-auto p-6 mt-40">
      <CategoriesDropdown categories={categories} />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <motion.div
            layout
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 md:w-2/3 mx-auto">
            <AnimatePresence>
              {filteredProducts?.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center">
                  No products found in this category.
                </motion.p>
              ) : (
                filteredProducts
                  ?.slice(
                    0,
                    showAll ? filteredProducts.length : PRODUCTS_DISPLAY_LIMIT,
                  )
                  .map(product => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}>
                      <ProductCard product={product} />
                    </motion.div>
                  ))
              )}
            </AnimatePresence>
          </motion.div>
          <div className="text-center flex flex-col md:flex-row justify-center align-baseline md:gap-20 mt-6">
            <MainButton targetLink="/" btnContent="Back to Home" />
            {!showAll && filteredProducts?.length > PRODUCTS_DISPLAY_LIMIT && (
              <button
                onClick={handleViewAll}
                className="bg-[var(--main-color)] text-white py-2 px-6 mt-5 rounded hover:bg-red-600">
                View All Items
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
}
