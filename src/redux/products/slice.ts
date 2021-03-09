import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
// Thunks
import { signOut } from "../auth/thunks";
import * as ordersThunks from "../orders/thunks";
import * as productsThunks from "./thunks";
// Utils
import _ from "lodash";
import {
  reverseSortOrder,
  handleStart,
  handleSuccess,
  handleError,
} from "../utils";
// Types
import { PayloadAction } from "@reduxjs/toolkit";
import { ProductsState, ProductsTableColumns } from "./types";
import { RequestStatus } from "../../types/redux";
import { Product } from "../../services/apis/WikkiApi";
import { RootState } from "../store";

const productsAdapter = createEntityAdapter<Product>();

const initialState = productsAdapter.getInitialState<ProductsState>({
  status: RequestStatus.IDLE,
  error: null,
  searchQuery: "",
  productsPerPage: 5,
  currentPage: 1,
  columnToSort: ProductsTableColumns.CODE,
  sortOrder: "ascending",
  // CRUD
  addStatus: RequestStatus.IDLE,
  addError: null,
  deleteStatus: RequestStatus.IDLE,
  deleteError: null,
  editStatus: RequestStatus.IDLE,
  editError: null,
});

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    searchProducts(state, action: PayloadAction<{ query: string }>) {
      state.searchQuery = action.payload.query;
      state.currentPage = 1;
    },
    changeProductsPerPage(state, action: PayloadAction<number>) {
      state.productsPerPage = action.payload;
      state.currentPage = 1;
    },
    changeCurrentProductsPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    handleSortProductColumn(
      state,
      action: PayloadAction<ProductsTableColumns>
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
      // Sign Out
      .addCase(signOut.fulfilled, (state) => {
        state = initialState;
      })
      // Add Order
      .addCase(ordersThunks.addOrder.fulfilled, (state, action) => {
        productsAdapter.upsertOne(state, action.payload.product);
      })
      // Fetch Product
      .addCase(productsThunks.fetchProducts.pending, handleStart)
      .addCase(productsThunks.fetchProducts.fulfilled, (state, action) => {
        const { products } = action.payload;
        productsAdapter.upsertMany(state, products);
        handleSuccess(state);
      })
      .addCase(productsThunks.fetchProducts.rejected, handleError)
      // Add Product
      .addCase(productsThunks.addProduct.pending, (state) => {
        state.addStatus = RequestStatus.PENDING;
        state.addError = null;
      })
      .addCase(productsThunks.addProduct.fulfilled, (state, action) => {
        productsAdapter.addOne(state, action.payload);
        state.addStatus = RequestStatus.FULFILLED;
      })
      .addCase(productsThunks.addProduct.rejected, (state, action) => {
        state.addStatus = RequestStatus.REJECTED;
        state.addError = action.payload || "Algum erro ocorreu";
      })
      // Delete Product
      .addCase(productsThunks.deleteProduct.pending, (state) => {
        state.deleteStatus = RequestStatus.PENDING;
        state.deleteError = null;
      })
      .addCase(productsThunks.deleteProduct.fulfilled, (state, action) => {
        productsAdapter.removeOne(state, action.payload.id);
        state.deleteStatus = RequestStatus.FULFILLED;
      })
      .addCase(productsThunks.deleteProduct.rejected, (state, action) => {
        state.deleteStatus = RequestStatus.REJECTED;
        state.deleteError = action.payload || "Algum erro ocorreu";
      })
      // Edit Product
      .addCase(productsThunks.editProduct.pending, (state) => {
        state.editStatus = RequestStatus.PENDING;
        state.editError = null;
      })
      .addCase(productsThunks.editProduct.fulfilled, (state, action) => {
        const { id, ...changes } = action.payload;
        productsAdapter.updateOne(state, {
          id: id || "",
          changes,
        });
        state.editStatus = RequestStatus.FULFILLED;
      })
      .addCase(productsThunks.editProduct.rejected, (state, action) => {
        state.editStatus = RequestStatus.REJECTED;
        state.editError = action.payload || "Algum erro ocorreu";
      });
  },
});

export const {
  selectAll: selectProducts,
} = productsAdapter.getSelectors<RootState>((state) => state.products);

export const selectFilteredProducts = (state: RootState) => {
  // Apply all needed filters to orders
  // (search, sorting, ...)
  const products = selectProducts(state);
  const { searchQuery, columnToSort, sortOrder } = state.products;
  const searchedProducts = products.filter((product) =>
    Object.values(product)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
  const sortType = sortOrder === "ascending" ? "asc" : "desc";
  return _.orderBy(searchedProducts, [columnToSort], [sortType]);
};

export const selectVisibleProducts = (state: RootState) => {
  const filteredProducts = selectFilteredProducts(state);
  const { productsPerPage, currentPage } = state.products;
  const firstItemOfCurrentPage = productsPerPage * (currentPage - 1);
  const lastItemOfCurrentPage =
    productsPerPage * (currentPage - 1) + productsPerPage;
  return filteredProducts.slice(
    firstItemOfCurrentPage,
    lastItemOfCurrentPage
  );
};

export const {
  searchProducts,
  changeProductsPerPage,
  changeCurrentProductsPage,
  handleSortProductColumn,
} = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
