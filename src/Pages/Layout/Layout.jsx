import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./Layout.module.css";
export default function Layout() {
  // const [count, setCount] = useState(0);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}
