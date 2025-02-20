import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import registerBackground from "../../assets/about-us.jpg";
import Logo from "../../components/Navbar/Logo";
import { UserContext } from "../../context/UserContext";

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[A-Z][a-z]+( [A-Z][a-z]+)+$/,
      "Name must contain first and last names, each starting with an uppercase letter.",
    )
    .required("Name is required."),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format.",
    )
    .required("Email is required."),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include an uppercase letter, a lowercase letter, a number, and a special character.",
    )
    .required("Password is required."),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match.")
    .required("Please confirm your password."),
  phone: Yup.string()
    .matches(
      /^01[0-2,5]\d{8}$/,
      "Phone number must be 11 digits and start with 010, 011, 012, or 015.",
    )
    .required("Phone number is required."),
});

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  let { setIsUser } = useContext(UserContext);
  async function handleSubmit(formValues) {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues)
      .then(res => {
        if (res.data.message === "success") {
          setIsLoading(false);
          toast.success(res.data.message);
          localStorage.setItem("token", res.data.token);
          setIsUser(true);
          navigate("/");
        }
      })
      .catch(err => {
        setIsLoading(false);
        toast.error(err.response.data.message);
      });
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: handleSubmit,
  });

  return (
    <section className="bg-white mt-10">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-96 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Login Background"
            src={registerBackground}
            className="absolute inset-0 h-full w-full  opacity-70"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <Logo />

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl  md:text-4xl">
              Welcome to BoShop
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              nam dolorum aliquam, quibusdam aperiam voluptatum.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 mt-5  sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className=" md:w-[100vw] max-w-xl mx-auto shadow-lg rounded p-4 lg:p-10   ">
            <h2 className="text-3xl md:text-4xl text-black font-bold mb-10 text-center">
              Sign Up
            </h2>

            <form onSubmit={formik.handleSubmit}>
              {/* Name Input */}
              <div className="mb-5">
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  className={`block w-full p-2.5 text-sm rounded-lg focus:outline-none focus:ring-2 focus:border-2 ${
                    formik.touched.name && formik.errors.name
                      ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                      : formik.touched.name
                        ? "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500"
                        : "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="Full Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="mt-2 text-sm text-red-600">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div className="mb-5">
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  className={`block w-full p-2.5 text-sm rounded-lg focus:outline-none focus:ring-2 focus:border-2 ${
                    formik.touched.email && formik.errors.email
                      ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                      : formik.touched.email
                        ? "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500"
                        : "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="Your Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="mb-5">
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="new-password"
                  className={`block w-full p-2.5 text-sm rounded-lg focus:outline-none focus:ring-2 focus:border-2 ${
                    formik.touched.password && formik.errors.password
                      ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                      : formik.touched.password
                        ? "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500"
                        : "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="mb-5">
                <input
                  type="password"
                  id="rePassword"
                  name="rePassword"
                  autoComplete="new-password"
                  className={`block w-full p-2.5 text-sm rounded-lg focus:outline-none focus:ring-2 focus:border-2 ${
                    formik.touched.rePassword && formik.errors.rePassword
                      ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                      : formik.touched.rePassword
                        ? "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500"
                        : "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="Confirm Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.rePassword}
                />
                {formik.touched.rePassword && formik.errors.rePassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {formik.errors.rePassword}
                  </p>
                )}
              </div>

              {/* Phone Number Input */}
              <div className="mb-5">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  className={`block w-full p-2.5 text-sm rounded-lg focus:outline-none focus:ring-2 focus:border-2 ${
                    formik.touched.phone && formik.errors.phone
                      ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                      : formik.touched.phone
                        ? "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500"
                        : "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="Phone Number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="mt-2 text-sm text-red-600">
                    {formik.errors.phone}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`${
                  isLoading ? "cursor-not-allowed opacity-50" : ""
                } text-white mt-5 bg-[var(--main-color)] hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm lg:w-full sm:w-auto px-5 py-2.5 text-center`}>
                {isLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Submit"
                )}
              </button>

              <p className="text-center text-gray-600 mt-5">
                Already have an account?
                <Link to="/login" className="text-blue-600">
                  <span className="ml-2 text-gray font-medium hover:underline">
                    Login
                  </span>
                </Link>
              </p>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}
