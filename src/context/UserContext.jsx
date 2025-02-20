import axios from "axios";
import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
function UserContextProvider({ children }) {
  const [isUser, setIsUser] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      verifyUserToken();
    }
  }, []);

  // handle function to verfy token

  function verifyUserToken() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(res => {
        setIsUser(true);
        setUserId(res.data.decoded.id);
        console.log(res.data.decoded.id);
      })
      .catch(err => {
        setIsUser(false);
        localStorage.clear();
        console.log(err);
      });
  }

  return (
    <UserContext.Provider value={{ isUser, setIsUser, userId }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
