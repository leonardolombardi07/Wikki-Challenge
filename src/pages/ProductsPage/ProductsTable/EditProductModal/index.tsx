import React from "react";
// Hooks
import { useEditProductModal } from "../useEditProductModal";
// Components
import { Modal } from "semantic-ui-react";
import { EditProductForm } from "./EditProductForm";
// Types
import { Product } from "../../../../services/apis/WikkiApi";

interface EditProductModalProps {
  productToEdit: Product;
}

export const EditProductModal: React.FC<EditProductModalProps> = ({
  productToEdit,
}) => {
  const {
    isEditProductModalOpen,
    closeEditProductModal,
  } = useEditProductModal();
  return (
    <Modal
      open={isEditProductModalOpen}
      closeIcon
      onClose={closeEditProductModal}
    >
      <EditProductForm productToEdit={productToEdit} />
    </Modal>
  );
};
