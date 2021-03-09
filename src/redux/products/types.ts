import { RequestStatus, SortOrder } from "../../types/redux";

export enum ProductsTableColumns {
  CODE = "code",
  PRODUCT = "name",
  PRICE = "price",
}

export interface ProductsState {
  status: RequestStatus;
  error: null | string;
  // Search
  searchQuery: string;
  // Pagination
  productsPerPage: number;
  currentPage: number;
  // Column Sorting
  columnToSort: ProductsTableColumns;
  sortOrder: SortOrder;
  // CRUD
  addStatus: RequestStatus;
  addError: null | string;
  deleteStatus: RequestStatus;
  deleteError: null | string;
  editStatus: RequestStatus;
  editError: null | string;
}

export interface AddProductForm {
  name: string;
  price: number;
}
