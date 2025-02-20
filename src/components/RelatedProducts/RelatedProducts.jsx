import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import UseProducts from "../../Hooks/UseProducts";
import HeaderSection from "../../Shared/HeaderSection";
import Spinner from "../../Shared/Spinner";
import ProductCard from "../ProductCard/ProductCard";
import "./RelatedProducts.module.css";
import sliderSettings from "../../Shared/SliderSettings";

export default function RelatedProducts() {
  // Fetch related products based on the category
  const { category, id } = useParams();

  const { data: relatedProducts, isLoading: isRelatedProductsLoading } =
    UseProducts({
      category,
      select: products => products.filter(product => product.id !== id), // Filter out the current product
      staleTime: 60 * 60 * 1000, // 1 hour
    });

  return (
    <>
      <div className="mt-10">
        <HeaderSection className="mb-20" title="You May Like " />
        {isRelatedProductsLoading ? (
          <Spinner />
        ) : relatedProducts?.length > 0 ? (
          <div className="w-11/12 mx-auto">
            <Slider {...sliderSettings}>
            {relatedProducts.map(product => (
              <div key={product.id} className="px-2">
                <ProductCard product={product} />
              </div>
            ))}
            </Slider>
            <Link to="/products">
              <button className="my-8 bg-[var(--main-color)] text-white py-2 mx-auto flex items-center justify-center rounded hover:bg-red-600 w-[200px]">
                All Products
              </button>
            </Link>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No related products found.
          </p>
        )}
      </div>
    </>
  );
}
