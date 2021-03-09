import React from "react";
// Hooks
import { useAddProductModal } from "./useAddProductModal";
// Components
import { Modal, Button } from "semantic-ui-react";
import { AddOrderForm } from "./AddProductForm";

export const AddProductModal: React.FC = () => {
  const {
    isAddProductModalOpen,
    openAddProductModal,
    closeAddProductModal,
  } = useAddProductModal();
  return (
    <Modal
      open={isAddProductModalOpen}
      trigger={
        <Button
          icon={"add"}
          floated={"right"}
          onClick={openAddProductModal}
        />
      }
      closeIcon
      onClose={closeAddProductModal}
    >
      <AddOrderForm />
    </Modal>
  );
};
