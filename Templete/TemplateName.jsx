import { useEffect } from "react";
import "./TemplateName.css";
export default function TemplateName() {
    const [count, setCount] = useState(0);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <h1>TemplateName</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis suscipit
        labore quod saepe at illo accusamus vel eius voluptatibus enim.
      </p>
    </>
  );
}
