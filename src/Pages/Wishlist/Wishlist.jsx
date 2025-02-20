import { useEffect } from "react";
import "./Wishlist.css";
export default function Wishlist() {
    const [count, setCount] = useState(0);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <h1>Wishlist</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis suscipit
        labore quod saepe at illo accusamus vel eius voluptatibus enim.
      </p>
    </>
  );
}
