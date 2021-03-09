// Hooks
import { useMemo } from "react";
import { useDispatch } from "./useDispatch";
// Redux
import {
  signUp,
  resetAuthAsyncState,
  signIn,
  signOut,
} from "../../redux/auth";
import {
  fetchProducts,
  searchProducts,
  changeProductsPerPage,
  changeCurrentProductsPage,
  handleSortProductColumn,
  deleteProduct,
  editProduct,
} from "../../redux/products";
import {
  fetchOrders,
  searchOrders,
  changeOrdersPerPage,
  changeCurrentOrdersPage,
  handleSortOrdersColumn,
  addOrder,
  deleteOrder,
} from "../../redux/orders";
import { openModal, hideModal } from "../../redux/UI";
// Utils
import { bindActionCreators } from "redux";

/* THIS IS BAD CODE. 
We need to find a way to stripe actions 
automatically from the redux module
*/
const actionCreators = {
  // Products
  fetchProducts,
  searchProducts,
  changeProductsPerPage,
  changeCurrentProductsPage,
  handleSortProductColumn,
  deleteProduct,
  editProduct,
  // orders,
  fetchOrders,
  searchOrders,
  changeOrdersPerPage,
  changeCurrentOrdersPage,
  handleSortOrdersColumn,
  addOrder,
  deleteOrder,
  // Auth
  signUp,
  signIn,
  resetAuthAsyncState,
  signOut,
  // UI
  openModal,
  hideModal,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(actionCreators, dispatch), [
    dispatch,
  ]);
};
