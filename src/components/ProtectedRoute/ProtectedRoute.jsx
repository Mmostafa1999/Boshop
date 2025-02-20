import { Navigate } from "react-router-dom";
import "./ProtectedRoute.module.css";
// eslint-disable-next-line react/prop-types
export default function ProtectedRoute({ children }) {

  

  if (localStorage.getItem("token") !== null) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
