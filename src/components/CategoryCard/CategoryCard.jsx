import { Link } from "react-router-dom";
import "./CategoryCard.module.css";
import Spinner from "../../Shared/Spinner";
import { toast } from "react-toastify";
import ToastMessage from "../../Shared/ToastMessage";
import UseProducts from "../../Hooks/UseProducts";

export default function CategoryCard() {
  // Fetch categories using the UseProducts hook
  const {
    data: categories,
    isLoading,
    isError,
  } = UseProducts({
    fetchCategories: true,
  });

  // Filtered category names to display
  const categoryNamesToDisplay = [
    "Men's Fashion",
    "Women's Fashion",
    "Electronics",
  ];

  // Filter categories for display
  const filteredCategories = categories?.filter(category =>
    categoryNamesToDisplay.includes(category.name),
  );

  if (isLoading) return <Spinner />;
     if (isError) {
      toast.error("An error occurred while loading products!");
      return <ToastMessage />;
    }
  return (
    <section>
      <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 my-20 gap-6">
        {filteredCategories?.map(category => (
          <Link
            key={category._id}
            to={`/categories/${category.name.toLowerCase()}`}>
            <div className="relative group h-[340px] overflow-hidden rounded-md shadow-lg">
              {/* Category Image */}
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
              />

              {/* Overlay */}
              <div className="absolute inset-0 group-hover:bg-black/70 transition-colors duration-300"></div>

              {/* Text Content */}
              <div className="absolute inset-0 flex items-center justify-center text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg font-bold">{category.name}</h3>
                <span className="absolute bottom-0 w-full rounded bg-black px-8 py-2 text-sm font-medium text-white hover:bg-[var(--main-color)] z-10">
                  Shop Now
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
