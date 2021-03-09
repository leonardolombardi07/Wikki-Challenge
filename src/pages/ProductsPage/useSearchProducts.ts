// Hooks
import { useSelector, useActions } from "../../redux";
// Redux
import { selectVisibleProducts } from "../../redux/products";

export const useSearchProducts = () => {
  const searchQuery = useSelector((state) => state.products.searchQuery);
  const visibleProducts = useSelector(selectVisibleProducts);

  const { searchProducts } = useActions();
  const resetSearchQuery = () => searchProducts({ query: "" });

  const isEmptySearch = Boolean(
    searchQuery && visibleProducts.length === 0
  );

  return {
    searchQuery,
    visibleProducts,
    searchProducts,
    resetSearchQuery,
    isEmptySearch,
  };
};
