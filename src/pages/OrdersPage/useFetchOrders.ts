// Hooks
import { useEffect } from "react";
import { useSelector, useActions } from "../../redux";
// Redux
import { selectIsAuthenticated } from "../../redux/auth";

export const useFetchOrders = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const status = useSelector((state) => state.orders.status);
  const isEmptyOrders =
    useSelector((state) => state.orders.ids).length === 0;

  const { fetchOrders } = useActions();
  useEffect(() => {
    fetchOrders();
  }, [isAuthenticated, fetchOrders]);

  return {
    isAuthenticated,
    status,
    isEmptyOrders,
    fetchOrders,
  };
};
