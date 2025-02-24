/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CartItemRow({ item, setCartData, setNumberOfCart, removeCartItem }) {
  const [quantity, setQuantity] = useState(item.count);
  const [tempQuantity, setTempQuantity] = useState(item.count); // Local input state

  useEffect(() => {
    setQuantity(item.count);
    setTempQuantity(item.count);
  }, [item.count]);

  // Debounced cart update function (fires after user stops typing)
  const updateCartCount = useCallback(
    debounce(async (productId, count) => {
      if (count < 1) return;
      try {
        const { data } = await axios.put(
          `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
          { count },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          },
        );
        setCartData(data.data);
        setQuantity(count); // Ensure UI syncs with API
      } catch (error) {
        console.error("Failed to update cart count", error);
      }
    }, 500),
    [setCartData, setNumberOfCart],
  );

  return (
    <tr className="border-b border-gray-300 bg-white hover:bg-gray-50 text-sm sm:text-base">
      {/* Product Info */}
      <td className="py-3 px-4 w-[200px] sm:w-auto">
        <Link to={`/productdetails/${item.product._id}/${item.product.category.name}`} className="flex items-center gap-4">
          <img src={item.product.imageCover} alt={item.product.title} className="w-16 h-16 sm:w-20 sm:h-20 object-cover" />
          <h4 className="font-medium text-sm sm:text-lg truncate max-w-[120px] sm:max-w-none">{item.product.title}</h4>
        </Link>
      </td>

      {/* Product Price */}
      <td className="py-3 px-2 sm:px-4 font-semibold text-gray-800">${item.price}</td>

      {/* Quantity Controls */}
      <td className="py-3 px-2 sm:px-4">
        <div className="border w-[90px] sm:w-[100px] border-gray-400 rounded flex justify-between items-center">
          {/* Decrement Button */}
          <button
            disabled={quantity === 1}
            onClick={() => {
              const newQuantity = quantity - 1;
              setQuantity(newQuantity);
              setTempQuantity(newQuantity);
              updateCartCount(item.product._id, newQuantity);
            }}
            className="border-r px-2 py-1 hover:bg-red-500 hover:text-white disabled:bg-gray-200">
            -
          </button>

          {/* Quantity Input */}
          <input
            type="number"
            min="1"
            value={tempQuantity}
            onChange={e => {
              const value = e.target.value;
              if (value === "" || (Number(value) > 0 && Number(value) < 999)) {
                setTempQuantity(value);
              }
            }}
            onBlur={() => {
              if (tempQuantity !== "") {
                const finalQuantity = Number(tempQuantity);
                setQuantity(finalQuantity);
                updateCartCount(item.product._id, finalQuantity);
              } else {
                setTempQuantity(quantity);
              }
            }}
            className="w-8 h-8 text-center border-none outline-none text-sm sm:text-lg font-medium"
          />

          {/* Increment Button */}
          <button
            onClick={() => {
              const newQuantity = quantity + 1;
              setQuantity(newQuantity);
              setTempQuantity(newQuantity);
              updateCartCount(item.product._id, newQuantity);
            }}
            className="border-l px-2 py-1 hover:bg-red-500 hover:text-white disabled:bg-gray-200">
            +
          </button>
        </div>
      </td>

      {/* Total Price */}
      <td className="py-3 px-2 sm:px-4 font-semibold text-gray-800">${quantity * item.price || 0}</td>

      {/* Remove Item Button */}
      <td className="py-3 px-2 sm:px-4">
        <button className="text-red-500 hover:text-red-700" onClick={() => removeCartItem(item.product._id, setCartData, setNumberOfCart)}>
          <i className="fa-regular fa-circle-xmark"></i>
        </button>
      </td>
    </tr>
  );
}
