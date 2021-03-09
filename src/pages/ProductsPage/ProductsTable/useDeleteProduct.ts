// Hooks
import { useState } from "react";
import { useSelector, useDispatch } from "../../../redux";
// Redux
import { unwrapResult } from "@reduxjs/toolkit";
import { deleteProduct } from "../../../redux/products";
// Types
import { Product } from "../../../services/apis/WikkiApi";
import { RequestStatus } from "../../../types/redux";

export const useDeleteProduct = () => {
  const [productToDelete, setProductToDelete] = useState<null | Product>(
    null
  );
  const [
    isConfirmDeleteProductModalOpen,
    setIsConfirmDeleteProductModalOpen,
  ] = useState(false);
  const openConfirmModal = (order: Product) => {
    setProductToDelete(order);
    setIsConfirmDeleteProductModalOpen(true);
  };
  const closeConfirmModal = () => {
    setIsConfirmDeleteProductModalOpen(false);
    setProductToDelete(null);
  };

  const { deleteStatus, deleteError } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const handleDeleteProduct = async (product: Product) => {
    try {
      const resultAction = await dispatch(deleteProduct(product));
      unwrapResult(resultAction);
      closeConfirmModal();
    } catch (error) {}
  };
  return {
    isConfirmDeleteProductModalOpen,
    openConfirmModal,
    closeConfirmModal,
    productToDelete,
    deleteProduct: handleDeleteProduct,
    isLoading: deleteStatus === RequestStatus.PENDING,
    error: deleteError,
  };
};
