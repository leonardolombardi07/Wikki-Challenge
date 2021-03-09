// Hooks
import { useSelector, useDispatch } from "../../../../redux";
import { useEditProductModal } from "../useEditProductModal";
// Redux
import { unwrapResult } from "@reduxjs/toolkit";
import { editProduct } from "../../../../redux/products";
// Types
import { Product } from "../../../../services/apis/WikkiApi";
import { RequestStatus } from "../../../../types/redux";

export const useEditProduct = () => {
  const { editStatus, editError } = useSelector((state) => state.products);
  const { closeEditProductModal } = useEditProductModal();
  const dispatch = useDispatch();
  const handleEditProduct = async (product: Product) => {
    try {
      const resultAction = await dispatch(editProduct(product));
      unwrapResult(resultAction);
      closeEditProductModal();
    } catch (error) {}
  };
  return {
    editProduct: handleEditProduct,
    isLoading: editStatus === RequestStatus.PENDING,
    error: editError,
  };
};
