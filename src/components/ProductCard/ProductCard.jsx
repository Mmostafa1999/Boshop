/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link } from "react-router-dom";
import ProductRating from "../../Shared/ProductRating";
import { cartContext } from "../../context/CartContext";

export default function ProductCard({ product, isOnSale }) {
  const { addToCart, removeCartItem, isProductAdded, cartActionLoading } =
    useContext(cartContext);
  const isAdded = isProductAdded(product._id);

  return (
    <section className="product group bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-700 hover:scale-105">
      <Link
        to={`/productdetails/${product._id}/${product.category.name}`}
        className="">
        <div className="relative overflow-hidden">
          {isOnSale && (
            <p className="absolute -left-px z-10 -top-px rounded-bl-3xl rounded-tr-3xl bg-[var(--main-color)] p-2 font-medium tracking-widest text-white">
              <span>Sale</span>{" "}
              {product.priceAfterDiscount &&
                (
                  ((product.price - product.priceAfterDiscount) /
                    product.price) *
                  100
                ).toFixed(0)}
              %
            </p>
          )}
          <div>
            <img
              src={product.imageCover}
              alt={product.title}
              className="w-full h-60 object-cover transition-transform duration-600 transform group-hover:scale-102"
            />
          </div>
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate transition-colors duration-300 group-hover:text-gray-700">
          {product.title}
        </h3>
        <p className="mt-1 text-gray-700 line-clamp-2 transition-colors duration-300 group-hover:text-gray-600">
          {product.description}
        </p>
        <div className="mt-2 flex items-center justify-between">
          {product.priceAfterDiscount ? (
            <>
              <span className="text-lg font-bold text-[var(--main-color)] transition-colors duration-300 group-hover:text-red-700">
                ${product.priceAfterDiscount}
              </span>
              <span className="line-through text-gray-500">
                ${product.price}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-gray-700">
              ${product.price}
            </span>
          )}
        </div>
        <ProductRating product={product} />
        <button
          onClick={() =>
            isAdded ? removeCartItem(product._id) : addToCart(product._id)
          }
          disabled={cartActionLoading}
          className={`btn ${
            isAdded
              ? "bg-red-500 hover:bg-red-600"
              : "bg-black hover:bg-[var(--dark-color)] disabled:cursor-not-allowed"
          } text-white p-2 rounded mt-2`}>
          {isAdded ? "Remove from Cart" : "Add to Cart"}
        </button>
      </div>
    </section>
  );
}
