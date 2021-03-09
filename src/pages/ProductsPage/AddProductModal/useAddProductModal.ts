// Hooks
import { useSelector, useActions } from "../../../redux";
// Redux
import { isModalOpen } from "../../../redux/UI";
// Types
import { ModalTypeEnum } from "../../../types/redux";

const modalType = ModalTypeEnum.ADD_PRODUCT_MODAL;

export const useAddProductModal = () => {
  const isAddProductModalOpen = useSelector((state) =>
    isModalOpen(state, modalType)
  );
  const { openModal, hideModal } = useActions();
  const openAddProductModal = () => openModal({ modalType });
  const closeAddProductModal = () => hideModal({ modalType });
  return {
    isAddProductModalOpen,
    openAddProductModal,
    closeAddProductModal,
  };
};
