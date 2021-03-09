// Hooks
import { useCallback } from "react";
import { useSelector, useDispatch } from "../../../redux";
import { useAddProductModal } from "./useAddProductModal";
// Redux
import { unwrapResult } from "@reduxjs/toolkit";
import { addProduct, AddProductForm } from "../../../redux/products";
// Types
import { RequestStatus } from "../../../types/redux";

export const useAddProduct = () => {
  const { addStatus, addError } = useSelector((state) => state.products);
  const { closeAddProductModal } = useAddProductModal();
  const dispatch = useDispatch();
  const handleAddProduct = useCallback(
    async (addProductFormValues: AddProductForm) => {
      try {
        const resultAction = await dispatch(
          addProduct(addProductFormValues)
        );
        unwrapResult(resultAction);
        closeAddProductModal();
      } catch (error) {}
    },
    [dispatch, closeAddProductModal]
  );
  return {
    isLoading: addStatus === RequestStatus.PENDING,
    error: addError,
    addProduct: handleAddProduct,
  };
};
