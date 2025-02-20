import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/CartContext";
import Spinner from "./../../Shared/Spinner";
import CartItemRow from "./CartItemRow";

export default function Cart() {
  const [cartData, setCartData] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [cartId, setCartId] = useState(null);
  const { removeCartItem, clearCart, setNumberOfCart } =
    useContext(cartContext);

  // Handle get logged user cart
  useEffect(() => {
    getLoggedUserCart();
  }, []);

  async function getLoggedUserCart() {
    setisLoading(true);
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
    setCartData(data.data);
    setCartId(data.cartId);
    setisLoading(false);
  }

  // calculate total cost
  const totalCost = useMemo(() => {
    return (
      cartData?.products?.reduce(
        (total, item) => total + item.count * item.price,
        0,
      ) || 0
    );
  }, [cartData]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="p-6 my-10 w-full lg:w-9/12 mt-32 mx-auto overflow-x-auto">
      {/* Cart Table */}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-black text-white text-left">
            <th className="py-3 px-4">Items</th>
            <th className="py-3 px-4">Price</th>
            <th className="py-3 px-4">Qty</th>
            <th className="py-3 px-4">Total</th>
            <th className="py-3 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {!cartData?.products || cartData?.products?.length === 0 ? (
            <tr className="border-b border-gray-300 bg-white hover:bg-gray-50">
              <td
                colSpan="5"
                className="py-3 font-bold text-2xl mt-10 px-4 text-center">
                Your Cart is empty!
              </td>
            </tr>
          ) : (
            cartData?.products.map(item => (
              <CartItemRow
                key={item.product._id}
                item={item}
                cartData={cartData}
                setCartData={setCartData}
                setNumberOfCart={setNumberOfCart}
                removeCartItem={() =>
                  removeCartItem(item.product._id, setCartData)
                }
              />
            ))
          )}
        </tbody>
      </table>

      {/* Discount and Grand Total Section */}
      <div className="flex flex-col mt-12 lg:flex-row gap-6 p-6 rounded-lg">
        {/* Discount Code */}
        <div className="flex-1 bg-white p-6 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Discount Code</h3>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter your code if you have one"
              className="flex-1 border border-gray-300 rounded p-2"
            />
            <button className="bg-black text-white px-6 py-2 rounded">
              Apply Code
            </button>
          </div>
          <div className="mt-6 flex gap-4">
            <Link
              to="/"
              className="flex-1 bg-[#d7d7d7] text-[#2d3a4b] py-3 text-center rounded hover:bg-red-600 hover:text-white">
              Continue Shopping
            </Link>
            <button
              onClick={() => clearCart(setCartData)}
              className="flex-1 bg-[#d7d7d7] text-[#2d3a4b] py-3 rounded hover:bg-red-600 hover:text-white">
              Clear Cart
            </button>
          </div>
        </div>

        {/* Grand Total */}
        <div className="flex-1 bg-white p-6 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Grand Total
          </h3>
          <hr className="my-4" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total Cost</span>
            <span>${totalCost}</span>
          </div>

          {/* <Link to="/checkout"> */}
          <Link to={`/checkout/${cartId}`}>
            <button
              className="w-full mt-6 bg-[#d7d7d7] text-[#2d3a4b] py-3
              hover:bg-red-600 hover:text-white">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
