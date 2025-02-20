/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function MainButton({targetLink, btnContent}) {
  return (
    <Link to={targetLink}>
      <button className="bg-[var(--main-color)] text-white py-2 px-6 mt-5 rounded hover:bg-red-600">
        {btnContent}
      </button>
    </Link>
  );
}
