import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Spinner from "../../Shared/Spinner";
import MainButton from "../../Shared/MainButton";

export default function Orders() {
  const { userId } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    // Remove cart-related data from local storage
    localStorage.removeItem("numberOfCart");
    localStorage.removeItem("cartStatus");

    // Fetch all orders
    allOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // Fetch user's orders
  async function allOrders() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      setOrders(data || []); // Ensure it's always an array
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <Spinner />;

  return (
    <section className="max-w-4xl mx-auto mt-32 p-5 bg-white shadow-lg rounded-lg leading-loose">
      <h1 className="text-2xl font-bold mb-5">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border-b border-gray-200 pb-4 mb-6">
            {/* Order Details */}
            <div className="mb-3">
              <h2 className="text-lg font-semibold">Order ID: {order._id}</h2>
              <p className="text-gray-600">
                Placed on: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Shipping Address */}
            <div className="mb-3">
              <h3 className="font-semibold">Shipping Address</h3>
              <p className="text-gray-600">{order.shippingAddress.details}</p>
              <p className="text-gray-600">City: {order.shippingAddress.city}</p>
              <p className="text-gray-600">Phone: {order.shippingAddress.phone}</p>
            </div>

            {/* Payment & Order Status */}
            <div className="flex justify-between items-center mb-3">
              <p>
                Payment Method:
                <span className="font-semibold">{order.paymentMethodType}</span>
              </p>
              <p
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  order.isPaid ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                }`}
              >
                {order.isPaid ? "Paid" : "Not Paid"}
              </p>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="font-semibold mb-2">Order Items</h3>
              {order.cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4 border-b py-2">
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-semibold">{item.product.title}</h4>
                    <p className="text-gray-500 text-sm">Quantity: {item.count}</p>
                    <p className="text-gray-800 font-semibold">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Price & Order Status */}
            <div className="mt-4 flex justify-between items-center">
              <h3 className="font-semibold text-lg">Total: ${order.totalOrderPrice}</h3>
              <p
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  order.isDelivered ? "bg-blue-100 text-blue-600" : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {order.isDelivered ? "Delivered" : "Pending"}
              </p>
            </div>

            {/* Shop Again Button */}
            <MainButton
              targetLink="/"
              btnContent="Shop Again"
              className="w-1/2 mt-4"
            />
          </div>
        ))
      )}
    </section>
  );
}
