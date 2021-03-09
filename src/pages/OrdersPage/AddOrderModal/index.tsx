import React from "react";
// Hooks
import { useAddOrderModal } from "./useAddOrderModal";
// Components
import { Modal, Button } from "semantic-ui-react";
import { AddOrderForm } from "./AddOrderForm";

export const AddOrderModal: React.FC = () => {
  const {
    isAddOrderModalOpen,
    openAddOrderModal,
    closeAddOrderModal,
  } = useAddOrderModal();
  return (
    <Modal
      open={isAddOrderModalOpen}
      trigger={
        <Button
          icon={"add"}
          floated={"right"}
          onClick={openAddOrderModal}
        />
      }
      closeIcon
      onClose={closeAddOrderModal}
    >
      <AddOrderForm />
    </Modal>
  );
};
