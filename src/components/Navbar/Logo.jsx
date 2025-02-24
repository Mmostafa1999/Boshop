import { Link } from "react-router-dom";
import logo from "../../../public/logo.svg";
export default function Logo() {
  return (
    <>
      <div className="flex  items-center gap-3">
        <Link to="/">
          <img src={logo} alt="logo" className="w-13 h-13" />
        </Link>
      </div>
    </>
  );
}
