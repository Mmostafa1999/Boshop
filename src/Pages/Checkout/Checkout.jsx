import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import MainButton from "../../Shared/MainButton";
import Spinner from "../../Shared/Spinner";

export default function Checkout() {
  const { cartId } = useParams();
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch cart data
  async function getLoggedUserCart() {
    setIsCartLoading(true);
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
    const cartData = response?.data?.data;
    setProducts(cartData?.products);
    setIsCartLoading(false);
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  function checkout() {
    setIsLoading(true);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
          params: {
            url: "http://localhost:5173",
          },
        },
      )
      .then(({ data }) => {
        console.log(data);
        location.href = data.session.url;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const validationSchema = Yup.object().shape({
    details: Yup.string().required("details is required."),
    phone: Yup.string().required("phone is required."),
    city: Yup.string().required("city is required."),
  });

  const initialValues = {
    details: "details",
    phone: "01010700999",
    city: "Cairo",
  };

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: checkout,
    });

  return (
    <section className="font-[sans-serif] bg-white mt-40">
      <div className="max-lg:max-w-xl mx-auto w-full">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Checkout Form */}
          <div className="lg:col-span-2 max-lg:order-1 p-6 !pr-0 max-w-4xl mx-auto w-full">
            <div className="text-center max-lg:hidden">
              <h2 className="text-3xl font-bold text-gray-800 inline-block border-b-2 border-gray-800 pb-1">
                Checkout
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="lg:mt-16">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Shipping info
                </h2>
                <div className="grid sm:grid-cols-2 gap-8 mt-8">
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Enter your city"
                    className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                  />
                  {errors.city && touched.city && (
                    <p className="text-red-500 text-xs">{errors.city}</p>
                  )}

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                  />
                  {errors.phone && touched.phone && (
                    <p className="text-red-500 text-xs">{errors.phone}</p>
                  )}
                  <input
                    type="text"
                    name="details"
                    placeholder="Details"
                    className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.details}
                  />
                  {errors.details && touched.details && (
                    <p className="text-red-500 text-xs">{errors.details}</p>
                  )}
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    disabled={isLoading || products.length === 0}
                    onClick={() => checkout()}
                    className="bg-[var(--main-color)] text-white py-2 px-6 mt-5 rounded hover:bg-red-600">
                    Place Order
                  </button>
                  <MainButton targetLink="/cart" btnContent="Back to Cart" />
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-100 lg:h-screen lg:sticky lg:top-0 lg:max-w-[430px] w-full lg:ml-auto">
            <div className="relative h-full">
              <div className="p-6 overflow-auto max-lg:max-h-[450px] lg:h-[calc(100vh-50px)]">
                <h2 className="text-xl font-bold text-gray-800">
                  Order Summary
                </h2>
                <div className="space-y-6 mt-8">
                  {isCartLoading ? (
                    <Spinner />
                  ) : products.length > 0 ? (
                    products.map((item, index) => {
                      const { product, price } = item;
                      return (
                        <div key={index} className="flex gap-4">
                          <div className="w-[124px] h-[130px] flex items-center justify-center p-4 shrink-0 bg-gray-200 rounded-lg">
                            <img
                              src={product?.imageCover}
                              className="w-full object-cover"
                              alt={product?.title}
                            />
                          </div>
                          <div className="w-full">
                            <h3 className="text-sm text-gray-800 font-bold">
                              {product?.title}
                            </h3>
                            <ul className="text-xs text-gray-800 space-y-1 mt-2">
                              <li className="flex flex-wrap gap-4 font-bold">
                                Price{" "}
                                <span className="ml-auto font-normal">
                                  ${price} x {item.count} = $
                                  {price * item.count}
                                </span>
                              </li>

                              <li className="flex flex-wrap gap-4 font-bold">
                                Brand{" "}
                                <span className="ml-auto  font-normal">
                                  {product?.brand?.name}
                                </span>
                              </li>
                              <li className="flex flex-wrap gap-4 font-bold">
                                Category{" "}
                                <span className="ml-auto font-normal">
                                  {product?.category?.name}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p>No products found in cart.</p>
                  )}
                </div>
              </div>
              <div className="lg:absolute lg:left-0 lg:bottom-0 bg-gray-200 w-full p-4">
                <h4 className="flex flex-wrap gap-4 text-sm text-gray-800 font-bold">
                  Total
                  <span className="ml-auto">
                    $
                    {products.reduce(
                      (acc, item) => acc + item.price * item.count,
                      0,
                    )}
                  </span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
