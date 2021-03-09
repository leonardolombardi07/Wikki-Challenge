// Hooks
import { useEffect } from "react";
import { useSelector, useActions, useDispatch } from "../../../../redux";
// Redux
import { unwrapResult } from "@reduxjs/toolkit";
import { signIn, signUp } from "../../../../redux/auth";
// Types
import { SignInForm, SignUpForm } from "../../../../redux/auth";
import { ModalTypeEnum } from "../../../../types/redux";

export const useAuthModalForms = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const { hideModal, resetAuthAsyncState } = useActions();

  const handleSignIn = async (signInForm: SignInForm) => {
    try {
      const result = await dispatch(signIn(signInForm));
      unwrapResult(result);
      hideModal({ modalType: ModalTypeEnum.SIGN_IN_MODAL });
    } catch (error) {}
  };

  const handleSignUp = async (signUpForm: SignUpForm) => {
    try {
      const result = await dispatch(signUp(signUpForm));
      unwrapResult(result);
      hideModal({ modalType: ModalTypeEnum.SIGN_UP_MODAL });
      hideModal({ modalType: ModalTypeEnum.SIGN_IN_MODAL });
    } catch (error) {}
  };

  useEffect(() => {
    return () => {
      resetAuthAsyncState();
    };
  }, [resetAuthAsyncState]);

  return { status, error, signIn: handleSignIn, signUp: handleSignUp };
};
