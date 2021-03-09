import React from "react";
// Components
import { Modal, Header } from "semantic-ui-react";
// Types
import { ModalProps } from "semantic-ui-react";
import { Order } from "../../../services/apis/WikkiApi";

interface OrderDetailModalProps extends ModalProps {
  selectedOrder: null | Order;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  selectedOrder,
  ...props
}) => {
  if (!selectedOrder) {
    return null;
  }

  return (
    <Modal dimmer={"blurring"} size={"tiny"} closeIcon {...props}>
      <Modal.Content>
        <Modal.Description>
          <Header>Pedido: {selectedOrder.code}</Header>
          <p>Cód. Produto: {selectedOrder.product.code}</p>
          <p>Nome do Produto: {selectedOrder.product.name}</p>
          <p>Quantidade: {selectedOrder.quantity}</p>
          <p>
            Total do pedido: R$
            {selectedOrder.quantity * selectedOrder.product.price}
          </p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};
