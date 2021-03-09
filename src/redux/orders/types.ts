import { Product } from "../../services/apis/WikkiApi";
import { RequestStatus, SortOrder } from "../../types/redux";

export enum OrdersTableColumns {
  CODE = "code",
  DETAILS = "details",
  QUANTITY = "quantity",
}

export interface OrdersState {
  status: RequestStatus;
  error: null | string;
  // Search
  searchQuery: string;
  // Pagination
  ordersPerPage: number;
  currentPage: number;
  // Column Sorting
  columnToSort: OrdersTableColumns;
  sortOrder: SortOrder;
  // CRUD
  addStatus: RequestStatus;
  addError: null | string;
  deleteStatus: RequestStatus;
  deleteError: null | string;
}

export interface AddOrderForm {
  product: Product | string;
  quantity: number;
}
