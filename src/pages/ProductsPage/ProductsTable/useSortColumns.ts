import { useSelector, useActions } from "../../../redux";
import { ProductsTableColumns } from "../../../redux/products";

export const useSortColumns = () => {
  const { sortOrder, columnToSort } = useSelector(
    (state) => state.products
  );
  const { handleSortProductColumn } = useActions();
  const sortIfIsColumnToSort = (column: ProductsTableColumns) => {
    return column === columnToSort ? sortOrder : undefined;
  };
  return {
    handleSortColumn: handleSortProductColumn,
    sortIfIsColumnToSort,
  };
};
