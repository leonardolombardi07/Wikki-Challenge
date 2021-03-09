import React from "react";
// Components
import { Modal, Header } from "semantic-ui-react";
// Types
import { ModalProps } from "semantic-ui-react";
import { Product } from "../../../services/apis/WikkiApi";

interface ProductDetailModalProps extends ModalProps {
  selectedProduct: null | Product;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  selectedProduct,
  ...props
}) => {
  if (!selectedProduct) {
    return null;
  }

  return (
    <Modal dimmer={"blurring"} size={"tiny"} closeIcon {...props}>
      <Modal.Content>
        <Modal.Description>
          <Header>{selectedProduct.code}</Header>
          <p>Produto: {selectedProduct.name}</p>
          <p>$ {selectedProduct.price}</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};
