/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

// eslint-disable-next-line react-refresh/only-export-components
export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartStatus, setCartStatus] = useState({});
  const [numberOfCart, setNumberOfCart] = useState(0);
  const [cartActionLoading, setCartActionLoading] = useState(false);

  useEffect(() => {
    const storedStatus = JSON.parse(localStorage.getItem("cartStatus")) || {};
    setCartStatus(storedStatus);

    const storedNumberOfCart = parseInt(localStorage.getItem("numberOfCart")) || 0;
    setNumberOfCart(storedNumberOfCart);
  }, []);

  const updateCartStatus = (productId, added) => {
    setCartStatus(prevCartStatus => {
      if (prevCartStatus[productId] === added) return prevCartStatus;
      const updatedStatus = { ...prevCartStatus, [productId]: added };
      localStorage.setItem("cartStatus", JSON.stringify(updatedStatus));
      return updatedStatus;
    });

    setNumberOfCart(prev => {
      const newCartCount = added ? prev + 1 : prev - 1;
      localStorage.setItem("numberOfCart", newCartCount);
      return newCartCount;
    });
  };

  const createApiInstance = () =>
    axios.create({
      baseURL: "https://ecommerce.routemisr.com/api/v1",
      headers: { token: localStorage.getItem("token") },
    });

  const addToCart = async productId => {
    try {
      setCartActionLoading(true);
      const api = createApiInstance();
      const { data } = await api.post("/cart", { productId });
      toast.success(data.message);
      updateCartStatus(productId, true);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setCartActionLoading(false);
    }
  };

  const removeCartItem = async (productId, setCartData) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be removed from your cart",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      cancelButtonText: "No, cancel!",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmDelete.isConfirmed) {
      Swal.fire("Cancelled", "Your product is still in the cart :)", "info");
      return;
    }

    try {
      setCartActionLoading(true);
      const api = createApiInstance();
      await api.delete(`/cart/${productId}`);

      Swal.fire("Deleted!", "The product has been removed from your cart.", "success");
      updateCartStatus(productId, false);
      
      setCartData(prevData => ({
        ...prevData,
        products: prevData.products.filter(item => item.product._id !== productId),
      }));
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setCartActionLoading(false);
    }
  };

  const clearCart = async (setCartData) => {
    const hasItemsInCart = Object.values(cartStatus).some(status => status);

    if (!hasItemsInCart) {
      Swal.fire("Info", "Your cart is already empty.", "info");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      cancelButtonText: "No, Cancel!",
      confirmButtonText: "Yes, Clear it!",
    });

    if (!result.isConfirmed) {
      Swal.fire("Cancelled", "Your cart still has products :)", "info");
      return;
    }

    try {
      setCartActionLoading(true);
      const api = createApiInstance();
      await api.delete("/cart");
      Swal.fire("Cleared!", "Your cart has been cleared.", "success");
      localStorage.removeItem("cartStatus");
      localStorage.removeItem("numberOfCart");
      setCartData({ products: [] });
      setNumberOfCart(0);
      setCartStatus({});
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setCartActionLoading(false);
    }
  };

  return (
    <cartContext.Provider
      value={{
        cartStatus,
        numberOfCart,
        cartActionLoading,
        addToCart,
        removeCartItem,
        clearCart,
        isProductAdded: productId => !!cartStatus[productId],
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
