import React from "react";
// Components
import { Modal, Header, Message, Button } from "semantic-ui-react";
// Types
import { ConfirmProps } from "semantic-ui-react";

/* Semantic UI React actually has a 'Confirm' component
which intends to serve exactly as a ConfirmActionModal. 
Their component, however, doesn't have a way to control 
the confirm button props (like loading, disabled, etc...).

But let's keep the ConfirmActionModal props as close as possible
to Semantic UI Confirm component for easying refactor when they
add the confirm button props control.
*/

type ConfirmPropsWithoutHandlers = Omit<
  ConfirmProps,
  "onCancel" | "onConfirm"
>;

interface ConfirmActionModalProps extends ConfirmPropsWithoutHandlers {
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
  error?: null | string;
}

export const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({
  open,
  onCancel,
  onConfirm,
  header,
  content,
  error,
  cancelButton,
  confirmButton,
  loading,
}) => {
  return (
    <Modal open={open}>
      <Modal.Content>
        <Modal.Description>
          {Boolean(header) && <Header>{header}</Header>}
          {Boolean(content) && <p>{content}</p>}
          {Boolean(error) && <Message negative>{error}</Message>}
        </Modal.Description>
      </Modal.Content>

      <Modal.Actions>
        <Button
          negative
          content={cancelButton || "Cancelar"}
          onClick={onCancel}
        />
        <Button
          content={confirmButton || "Confirmar"}
          icon="checkmark"
          positive
          onClick={loading ? undefined : onConfirm}
          loading={loading}
        />
      </Modal.Actions>
    </Modal>
  );
};
