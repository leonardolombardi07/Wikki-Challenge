import { useSelector, useActions } from "../../../redux";
import { OrdersTableColumns } from "../../../redux/orders";

export const useSortColumns = () => {
  const { sortOrder, columnToSort } = useSelector((state) => state.orders);
  const { handleSortOrdersColumn } = useActions();
  const sortIfIsColumnToSort = (column: OrdersTableColumns) => {
    return column === columnToSort ? sortOrder : undefined;
  };
  return {
    handleSortColumn: handleSortOrdersColumn,
    sortIfIsColumnToSort,
  };
};
