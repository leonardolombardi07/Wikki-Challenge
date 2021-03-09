// Hooks
import { useSelector, useActions } from "../../redux";
import { selectVisibleOrders } from "../../redux/orders";

export const useSearchOrders = () => {
  const searchQuery = useSelector((state) => state.orders.searchQuery);
  const visibleOrders = useSelector(selectVisibleOrders);

  const { searchOrders } = useActions();
  const resetSearchQuery = () => searchOrders({ query: "" });

  const isEmptySearch = Boolean(searchQuery && visibleOrders.length === 0);

  return {
    searchQuery,
    visibleOrders,
    searchOrders,
    resetSearchQuery,
    isEmptySearch,
  };
};
