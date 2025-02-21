import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useProducts({ id, category, fetchCategories } = {}) {
  // API endpoints
  const BASE_URL = "https://ecommerce.routemisr.com/api/v1/products";
  const CATEGORIES_URL = "https://ecommerce.routemisr.com/api/v1/categories";

  // Fetch all products or filter by category
  const fetchProducts = async () => {
    const { data } = await axios.get(BASE_URL);

    if (category) {
      return data.data.filter(
        product =>
          product.category.name.toLowerCase() === category.toLowerCase(),
      );
    }
    return data.data;
  };

  // Fetch a single product by ID
  const fetchProductById = async () => {
    const { data } = await axios.get(`${BASE_URL}/${id}`);
    return data.data;
  };

  // Fetch all categories
  const fetchCategoriesFn = async () => {
    const { data } = await axios.get(CATEGORIES_URL);
    return data.data;
  };

  // Dynamic query key and function
  const queryKey = id
    ? ["product", id]
    : fetchCategories
    ? ["categories"]
    : category
    ? ["products", "category", category]
    : ["products"];
  const queryFn = id
    ? fetchProductById
    : fetchCategories
    ? fetchCategoriesFn
    : fetchProducts;

  // Use React Query's useQuery
  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn,
    staleTime: 60 * 60 * 1000, // 1 hour
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    retry: 4, // Retry failed requests up to 4 times
    refetchOnWindowFocus: false, // Avoid refetching when the window regains focus
    refetchIntervalInBackground: true, // Refetch periodically in the background
  });

  return {
    data,
    isLoading,
    error,
  };
}
