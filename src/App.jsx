import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Brands from "./components/Brands/Brands";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CartContextProvider from "./context/CartContext";
import UserContextProvider from "./context/UserContext";
import About from "./Pages/About/About";
import Cart from "./Pages/Cart/Cart";
import Categories from "./Pages/Categories/Categories";
import Checkout from "./Pages/Checkout/Checkout";
import Contact from "./Pages/Contact/Contact";
import Home from "./Pages/Home/Home";
import Layout from "./Pages/Layout/Layout";
import Login from "./Pages/Login/Login";
import Notfound from "./Pages/Notfound/Notfound";
import Orders from "./Pages/Orders/Orders";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Products from "./Pages/Products/Products";
import Register from "./Pages/Register/Register";
import ScrollToTop from "./Shared/ScrollToTop";
import ToastContainerWrapper from "./Shared/ToastMessage";

const query = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

let router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "about",
        element: (
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout/:cartId",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories/:categoryName",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "contact",
        element: (
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={query}>
      <UserContextProvider>
        <CartContextProvider>
          <ReactQueryDevtools />
          <ToastContainerWrapper />
          <RouterProvider router={router}>
            <ScrollToTop />
          </RouterProvider>
        </CartContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}
