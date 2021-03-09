// Hooks
import { useState } from "react";
import { useSelector, useActions } from "../../../redux";
// Redux
import { isModalOpen } from "../../../redux/UI";
// Types
import { Product } from "../../../services/apis/WikkiApi";
import { ModalTypeEnum } from "../../../types/redux";

const modalType = ModalTypeEnum.EDIT_PRODUCT_MODAL;

export const useEditProductModal = () => {
  const [productToEdit, setProductToEdit] = useState<null | Product>(null);
  const isEditProductModalOpen = useSelector((state) =>
    isModalOpen(state, modalType)
  );
  const { openModal, hideModal } = useActions();
  const openEditProductModal = (productToEdit: Product) => {
    setProductToEdit(productToEdit);
    openModal({ modalType });
  };
  const closeEditProductModal = () => {
    setProductToEdit(null);
    hideModal({ modalType });
  };
  return {
    productToEdit,
    isEditProductModalOpen,
    openEditProductModal,
    closeEditProductModal,
  };
};
