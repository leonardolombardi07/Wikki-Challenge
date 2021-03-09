// Hooks
import { useSelector, useActions } from "../../../redux";
// Redux
import { isModalOpen } from "../../../redux/UI";
// Types
import { ModalTypeEnum } from "../../../types/redux";

export const useAuthModals = () => {
  const isSignInModalOpen = useSelector((state) =>
    isModalOpen(state, ModalTypeEnum.SIGN_IN_MODAL)
  );
  const isSignUpModalOpen = useSelector((state) =>
    isModalOpen(state, ModalTypeEnum.SIGN_UP_MODAL)
  );

  const { openModal, hideModal } = useActions();
  const openSignInModal = () =>
    openModal({ modalType: ModalTypeEnum.SIGN_IN_MODAL });
  const closeSignInModal = () =>
    hideModal({ modalType: ModalTypeEnum.SIGN_IN_MODAL });
  const openSignUpModal = () => {
    openModal({ modalType: ModalTypeEnum.SIGN_UP_MODAL });
    closeSignInModal();
  };
  const closeSignUpModal = () => {
    hideModal({ modalType: ModalTypeEnum.SIGN_UP_MODAL });
    openSignInModal();
  };

  return {
    isSignInModalOpen,
    isSignUpModalOpen,
    openSignInModal,
    closeSignInModal,
    openSignUpModal,
    closeSignUpModal,
  };
};
