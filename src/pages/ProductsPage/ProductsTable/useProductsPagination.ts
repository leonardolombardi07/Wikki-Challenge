// Hooks
import { useSelector, useActions } from "../../../redux";
// Redux
import { selectFilteredProducts } from "../../../redux/products";

export const useProductsPagination = () => {
  const filteredProducts = useSelector(selectFilteredProducts);
  const { productsPerPage, currentPage } = useSelector(
    (state) => state.products
  );
  const {
    changeProductsPerPage,
    changeCurrentProductsPage,
  } = useActions();
  const totalPagesCount = Math.ceil(
    filteredProducts.length / productsPerPage
  );
  return {
    currentPage,
    productsPerPage,
    changeProductsPerPage,
    changeCurrentProductsPage,
    totalPagesCount,
  };
};
