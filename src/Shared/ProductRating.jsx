/* eslint-disable react/prop-types */
export default function ProductRating({ product }) {
  return (
    <div className="mt-2 flex items-center gap-2 text-yellow-500">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <i
            key={i}
            className={`fas fa-star ${
              i < Math.round(product.ratingsAverage)
                ? "text-yellow-400"
                : "text-gray-300"
            }`}></i>
        ))}
      </div>
      <span className="text-gray-700 text-sm">({product.ratingsQuantity})</span>
    </div>
  );
}
