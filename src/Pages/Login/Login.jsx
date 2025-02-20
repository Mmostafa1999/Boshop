import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import loginBackground from "../../assets/login-background.png";
import Logo from "../../components/Navbar/Logo";
import { UserContext } from "../../context/UserContext";

const loginSchema = Yup.object().shape({
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
});

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setIsUser } = useContext(UserContext);

  async function handleLogin(formValues) {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValues)
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
        toast.error(err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: handleLogin,
  });

  return (
    <section className="bg-white mt-10">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-96 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Login Background"
            src={loginBackground}
            className="absolute inset-0 h-full w-full object-cover opacity-70"
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

        <main className="flex items-center justify-center px-8  sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className=" md:w-[100vw] max-w-xl mx-auto shadow-lg rounded p-4 lg:p-10   ">
            <h2 className="text-3xl md:text-4xl text-black font-bold mb-10 text-center">
              Login
            </h2>

            <form onSubmit={formik.handleSubmit}>
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

              <div className="flex flex-col gap-2 ">
                <p className="text-base  text-red-600 hover:underline mt-2 font-medium bold text-center">
                  Forget password?
                </p>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`${
                    isLoading ? "cursor-not-allowed opacity-50" : ""
                  } text-white mt-5 bg-[var(--main-color)] hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm lg:w-full sm:w-auto px-5 py-2.5 text-center`}>
                  {isLoading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
              <p className="text-center text-gray-600 mt-5">
                Don&apos;t have an account?
                <Link to="/register" className="text-blue-600">
                  <span className="ml-2 text-gray font-medium hover:underline">
                    Create an account
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
