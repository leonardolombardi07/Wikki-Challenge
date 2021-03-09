// Hooks
import { useEffect } from "react";
import { useSelector, useActions } from "../../redux";

export const useFetchProducts = () => {
  const status = useSelector((state) => state.products.status);
  const isEmptyProducts =
    useSelector((state) => state.products.ids).length === 0;

  const { fetchProducts } = useActions();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    status,
    isEmptyProducts,
    fetchProducts,
  };
};
