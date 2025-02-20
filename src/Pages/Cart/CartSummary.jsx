import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function CartSummary({ totalCost, handleClearCart }) {
    return (
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
              onClick={handleClearCart}
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

          <button className="w-full mt-6 bg-[#d7d7d7] text-[#2d3a4b] py-3 hover:bg-red-600 hover:text-white">
            Proceed to Checkout
          </button>
        </div>
      </div>
    );
  }
  