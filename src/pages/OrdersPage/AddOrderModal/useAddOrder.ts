// Hooks
import { useCallback } from "react";
import { useSelector, useDispatch } from "../../../redux";
import { useAddOrderModal } from "./useAddOrderModal";
import { useFormik } from "formik";
// Redux
import { unwrapResult } from "@reduxjs/toolkit";
import { addOrder } from "../../../redux/orders";
// Utils
import { validateField } from "../../../services/validation";
// Types
import { FormikErrors } from "formik";
import { AddOrderForm } from "../../../redux/orders";
import { ValidFields } from "../../../types/services/validation";
import { RequestStatus } from "../../../types/redux";
import { Product } from "../../../services/apis/WikkiApi";

export const useAddOrder = () => {
  const { addStatus, addError } = useSelector((state) => state.orders);
  const { closeAddOrderModal } = useAddOrderModal();

  const dispatch = useDispatch();
  const handleAddOrder = useCallback(
    async (addOrderFormValues: AddOrderForm) => {
      try {
        const resultAction = await dispatch(addOrder(addOrderFormValues));
        unwrapResult(resultAction);
        closeAddOrderModal();
      } catch (error) {}
    },
    [dispatch, closeAddOrderModal]
  );

  const { errors, touched, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      product: "",
      quantity: 1,
    },
    onSubmit: (values) => {
      handleAddOrder(values);
    },
    validate,
  });

  const setProduct = (product: string | Product) =>
    setFieldValue("product", product);
  const setQuantity = (qty: number) => setFieldValue("quantity", qty);

  return {
    // Redux
    isLoading: addStatus === RequestStatus.PENDING,
    error: addError,
    // Form
    productError: errors.product && touched.product && errors.product,
    quantityError: errors.quantity && touched.quantity && errors.quantity,
    setProduct,
    setQuantity,
    handleSubmit,
  };
};

function validate(values: AddOrderForm): FormikErrors<AddOrderForm> {
  let errors: FormikErrors<AddOrderForm> = {};
  if (typeof values.product === "string") {
    const productError = validateField(
      values.product,
      ValidFields.product
    );
    if (productError) {
      errors.product = productError;
    }
  }
  return errors;
}
