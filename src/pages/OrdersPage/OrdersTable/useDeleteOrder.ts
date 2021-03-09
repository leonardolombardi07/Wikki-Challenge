// Hooks
import { useState } from "react";
import { useSelector, useDispatch } from "../../../redux";
// Redux
import { unwrapResult } from "@reduxjs/toolkit";
import { deleteOrder } from "../../../redux/orders";
// Types
import { Order } from "../../../services/apis/WikkiApi";
import { RequestStatus } from "../../../types/redux";

export const useDeleteOrder = () => {
  const [orderToDelete, setOrderToDelete] = useState<null | Order>(null);
  const [
    isConfirmDeleteOrderModalOpen,
    setIsConfirmDeleteOrderModalOpen,
  ] = useState(false);
  const openConfirmModal = (order: Order) => {
    setOrderToDelete(order);
    setIsConfirmDeleteOrderModalOpen(true);
  };
  const closeConfirmModal = () => {
    setIsConfirmDeleteOrderModalOpen(false);
    setOrderToDelete(null);
  };

  const { deleteStatus, deleteError } = useSelector(
    (state) => state.orders
  );
  const dispatch = useDispatch();
  const handleDeleteOrder = async (order: Order) => {
    try {
      const resultAction = await dispatch(deleteOrder(order));
      unwrapResult(resultAction);
      closeConfirmModal();
    } catch (error) {}
  };

  return {
    isConfirmDeleteOrderModalOpen,
    openConfirmModal,
    closeConfirmModal,
    orderToDelete,
    deleteOrder: handleDeleteOrder,
    isLoading: deleteStatus === RequestStatus.PENDING,
    error: deleteError,
  };
};
