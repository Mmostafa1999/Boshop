/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CategoriesDropdown({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleCategorySelect = category => {
    setSelectedCategory(category);
    setIsOpen(false);
    if (category) {
      navigate(`/categories/${category.toLowerCase()}`);
    }
  };

  return (
    <div
      className="relative"
      onBlur={e => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false); // Close dropdown when focus moves outside
        }
      }}
      tabIndex={0} // Make the div focusable
    >
      <button
        className="relative z-10 w-auto rounded-full flex items-center mb-14 gap-8 mx-auto bg-[var(--main-color)] px-8 py-3 text-sm font-medium text-white hover:bg-red-600"
        onClick={() => setIsOpen(prev => !prev)}>
        <span>{selectedCategory || "Choose By Category"}</span>
        <i
          className={`fa-solid ${isOpen ? "fa-chevron-up" : "fa-chevron-down"} ml-2`}></i>
      </button>

      {isOpen && (
        <ul className="absolute bg-white border border-gray-300 rounded shadow-lg left-[43%] w-auto top-12 z-50">
          {categories.map(category => (
            <li
              key={category.id}
              className={`cursor-pointer px-4 py-2 ${
                selectedCategory === category.name
                  ? "bg-gray-200 font-bold"
                  : ""
              } hover:bg-gray-100`}
              onClick={() => handleCategorySelect(category.name)}
              tabIndex={0}>
              {category.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoriesDropdown;
