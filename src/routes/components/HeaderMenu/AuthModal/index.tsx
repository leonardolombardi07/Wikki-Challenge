import React from "react";
// Components
import { Modal, Button } from "semantic-ui-react";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
// Types
import { ModalProps } from "semantic-ui-react";

type VoidFunc = () => void;
interface AuthModalProps extends ModalProps {
  isSignInModalOpen: boolean;
  closeSignInModal: VoidFunc;
  openSignInModal: VoidFunc;
  isSignUpModalOpen: boolean;
  closeSignUpModal: VoidFunc;
  openSignUpModal: VoidFunc;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isSignInModalOpen,
  openSignInModal,
  closeSignInModal,
  isSignUpModalOpen,
  openSignUpModal,
  closeSignUpModal,
  ...props
}) => {
  return (
    <>
      <Modal
        open={isSignInModalOpen}
        onClose={closeSignInModal}
        size={"tiny"}
        closeIcon
        {...props}
      >
        <SignInForm openSignUpModal={openSignUpModal} />
      </Modal>

      <Modal
        open={isSignUpModalOpen}
        onClose={closeSignUpModal}
        size={"tiny"}
        {...props}
      >
        <Button
          basic
          circular
          icon={"angle left"}
          onClick={closeSignUpModal}
          style={{ marginLeft: 10, marginTop: 10 }}
        />

        <SignUpForm closeSignUpModal={closeSignUpModal} />
      </Modal>
    </>
  );
};
