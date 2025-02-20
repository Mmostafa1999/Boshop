import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import { cartContext } from "../../context/CartContext";
import UseProducts from "../../Hooks/UseProducts";
import ProductRating from "../../Shared/ProductRating";
import Spinner from "../../Shared/Spinner";
import "./ProductDetails.module.css";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart, removeCartItem, cartActionLoading, isProductAdded } =
    useContext(cartContext);

  const [mainImage, setMainImage] = useState(null);

  // Fetch the single product using the ID
  const { data: singleProduct, isLoading: isSingleProductLoading } =
    UseProducts({
      id,
      select: product => ({
        title: product.title,
        price: product.price,
        description: product.description,
        imageCover: product.imageCover,
        images: product.images,
        count: product.count,
        ratingsAverage: product.ratingsAverage,
        ratingsQuantity: product.ratingsQuantity,
      }),
      staleTime: 60 * 60 * 1000, // 1 hour to avoid refetching
    });

  useEffect(() => {
    if (singleProduct) setMainImage(singleProduct.imageCover);
  }, [singleProduct]);

  const handleImageChange = image => setMainImage(image);

  const handleToggle = async productId => {
    if (isProductAdded(productId)) {
      await removeCartItem(productId);
    } else {
      await addToCart(productId);
    }
  };

  if (isSingleProductLoading) return <Spinner />;

  return (
    <section>
      {singleProduct ? (
        <div className="flex flex-col mx-4 md:mx-32 mt-44">
          <div className="mx-auto flex flex-col gap-10">
            <div className="flex flex-col md:flex-row gap-16">
              {/* Image Section */}
              <div>
                <div className=" relative w-full aspect-w-1 aspect-h-1  flex items-center justify-center bg-zinc-100  md:h-[500px] md:w-[500px]">
                  <img
                    src={mainImage}
                    alt={singleProduct?.title}
                    className="w-full max-h-full rounded-lg hover:scale-105 transition-transform duration-300 object-cover"
                  />
                </div>
                <div className="flex flex-row mt-4 flex-wrap gap-1">
                  {singleProduct?.images?.map((image, index) => (
                    <div
                      key={index}
                      onClick={() => handleImageChange(image)}
                      className="relative flex items-center mx-1 justify-center bg-zinc-100 max-h-[70px] w-[70px] hover:scale-105 transition-transform duration-300 cursor-pointer">
                      <img
                        src={image}
                        alt={singleProduct?.title}
                        className="w-full rounded-lg h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl md:text-2xl font-bold">
                    {singleProduct.title}
                  </h2>
                  <ProductRating product={singleProduct} />
                  <p className="text-xl md:text-2xl font-bold ">
                    ${singleProduct.price}
                  </p>
                  <p className="text-sm text-gray-800">
                    {singleProduct.description}
                  </p>
                </div>
                <hr className="border-gray-300" />

                <div className="flex items-center gap-6">
                  <button
                    onClick={() => handleToggle(id)}
                    disabled={cartActionLoading}
                    className={`bg-red-500 text-white py-3 px-4 rounded ${
                      cartActionLoading
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    } hover:bg-red-600`}>
                    {cartActionLoading
                      ? "Loading..."
                      : isProductAdded(id)
                        ? "Remove From Cart"
                        : "Buy Now"}
                  </button>
                </div>

                <div className="border-2 border-gray-400 w-full h-44 flex flex-col py-6 mt-4 rounded">
                  <div className="flex items-center gap-4 ml-4 mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <i className="fa-solid fa-truck fa-xl"></i>
                    </div>
                    <p className="font-semibold">Fast Delivery</p>
                  </div>
                  <hr className="border-gray-400" />
                  <div className="flex items-center gap-4 ml-4 mt-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <i className="fa-solid fa-retweet fa-xl"></i>
                    </div>
                    <p className="font-semibold">30-Day Returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center mt-20">Product not found.</p>
      )}

      <RelatedProducts />
    </section>
  );
}
