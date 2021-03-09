// Hooks
import { useSelector, useActions } from "../../../redux";
// Redux
import { selectFilteredOrders } from "../../../redux/orders";

export const useOrdersPagination = () => {
  const filteredOrders = useSelector(selectFilteredOrders);
  const { ordersPerPage, currentPage } = useSelector(
    (state) => state.orders
  );
  const { changeOrdersPerPage, changeCurrentOrdersPage } = useActions();
  const totalPagesCount = Math.ceil(filteredOrders.length / ordersPerPage);
  return {
    currentPage,
    ordersPerPage,
    changeOrdersPerPage,
    changeCurrentOrdersPage,
    totalPagesCount,
  };
};
