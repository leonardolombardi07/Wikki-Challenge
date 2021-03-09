// Hooks
import { useSelector, useActions } from "../../../redux";
// Redux
import { isModalOpen } from "../../../redux/UI";
// Types
import { ModalTypeEnum } from "../../../types/redux";

const modalType = ModalTypeEnum.ADD_ORDER_MODAL;

export const useAddOrderModal = () => {
  const isAddOrderModalOpen = useSelector((state) =>
    isModalOpen(state, modalType)
  );
  const { openModal, hideModal } = useActions();
  const openAddOrderModal = () => openModal({ modalType });
  const closeAddOrderModal = () => hideModal({ modalType });
  return {
    isAddOrderModalOpen,
    openAddOrderModal,
    closeAddOrderModal,
  };
};
