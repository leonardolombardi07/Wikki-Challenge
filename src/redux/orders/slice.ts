import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
// Thunks
import { signOut } from "../auth/thunks";
import * as ordersThunks from "./thunks";
// Utils
import _ from "lodash";
import {
  handleStart,
  handleSuccess,
  handleError,
  reverseSortOrder,
} from "../utils";
// Types
import { PayloadAction } from "@reduxjs/toolkit";
import { OrdersState, OrdersTableColumns } from "./types";
import { RequestStatus } from "../../types/redux";
import { Order } from "../../services/apis/WikkiApi";
import { RootState } from "../store";

const ordersAdapter = createEntityAdapter<Order>();

const initialState = ordersAdapter.getInitialState<OrdersState>({
  status: RequestStatus.IDLE,
  error: null,
  // Search
  searchQuery: "",
  // Pagination
  ordersPerPage: 5,
  currentPage: 1,
  // Column Sorting
  columnToSort: OrdersTableColumns.CODE,
  sortOrder: "ascending",
  // CRUD
  addStatus: RequestStatus.IDLE,
  addError: null,
  deleteStatus: RequestStatus.IDLE,
  deleteError: null,
});

const ordersSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {
    searchOrders(state, action: PayloadAction<{ query: string }>) {
      state.searchQuery = action.payload.query;
      state.currentPage = 1;
    },
    changeOrdersPerPage(state, action: PayloadAction<number>) {
      state.ordersPerPage = action.payload;
      state.currentPage = 1;
    },
    changeCurrentOrdersPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    handleSortOrdersColumn(
      state,
      action: PayloadAction<OrdersTableColumns>
    ) {
      const selectedColumn = action.payload;
      state.currentPage = 1;
      state.columnToSort = selectedColumn;
      const didChangeColumToSort = state.columnToSort !== selectedColumn;
      if (didChangeColumToSort) {
        state.sortOrder = "ascending";
      } else {
        state.sortOrder = reverseSortOrder(state.sortOrder);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signOut.fulfilled, (state) => {
        state = initialState;
      })
      // Fetch Order
      .addCase(ordersThunks.fetchOrders.pending, handleStart)
      .addCase(ordersThunks.fetchOrders.fulfilled, (state, action) => {
        const { orders } = action.payload;
        ordersAdapter.upsertMany(state, orders);
        handleSuccess(state);
      })
      .addCase(ordersThunks.fetchOrders.rejected, handleError)
      // Add Order
      .addCase(ordersThunks.addOrder.pending, (state) => {
        state.addStatus = RequestStatus.PENDING;
        state.addError = null;
      })
      .addCase(ordersThunks.addOrder.fulfilled, (state, action) => {
        ordersAdapter.addOne(state, action.payload.order);
        state.addStatus = RequestStatus.FULFILLED;
      })
      .addCase(ordersThunks.addOrder.rejected, (state, action) => {
        state.addStatus = RequestStatus.REJECTED;
        state.addError = action.payload || "Algum erro ocorreu";
      })
      // Delete Order
      .addCase(ordersThunks.deleteOrder.pending, (state) => {
        state.deleteStatus = RequestStatus.PENDING;
        state.deleteError = null;
      })
      .addCase(ordersThunks.deleteOrder.fulfilled, (state, action) => {
        ordersAdapter.removeOne(state, action.payload.id);
        state.deleteStatus = RequestStatus.FULFILLED;
      })
      .addCase(ordersThunks.deleteOrder.rejected, (state, action) => {
        state.deleteStatus = RequestStatus.REJECTED;
        state.deleteError = action.payload || "Algum erro ocorreu";
      });
  },
});

export const {
  selectAll: selectOrders,
} = ordersAdapter.getSelectors<RootState>((state) => state.orders);

export const selectFilteredOrders = (state: RootState) => {
  // Apply all needed filters to orders
  // (search, sorting, ...)
  const orders = selectOrders(state);
  const { searchQuery, columnToSort, sortOrder } = state.orders;
  const searchedOrders = orders.filter((order) =>
    Object.values(order)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
  const sortType = sortOrder === "ascending" ? "asc" : "desc";
  let correctColumToSort =
    columnToSort === OrdersTableColumns.DETAILS
      ? "product.name"
      : columnToSort;
  return _.orderBy(searchedOrders, [correctColumToSort], [sortType]);
};

export const selectVisibleOrders = (state: RootState) => {
  const filteredOrders = selectFilteredOrders(state);
  const { ordersPerPage, currentPage } = state.orders;
  const firstItemOfCurrentPage = ordersPerPage * (currentPage - 1);
  const lastItemOfCurrentPage =
    ordersPerPage * (currentPage - 1) + ordersPerPage;
  return filteredOrders.slice(
    firstItemOfCurrentPage,
    lastItemOfCurrentPage
  );
};

export const {
  searchOrders,
  changeOrdersPerPage,
  changeCurrentOrdersPage,
  handleSortOrdersColumn,
} = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
