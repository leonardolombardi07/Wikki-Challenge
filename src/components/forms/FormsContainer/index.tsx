import React from "react";
// Components
import { Formik, Form as FormikForm, FormikErrors } from "formik";
import { Form } from "semantic-ui-react";
// Types
import { FormikConfig, FormikValues } from "formik";

// Anotamos o tipo de "values" como "any"
// para poder passar corretamente FormikValues
// Isso deve ser consertado!
interface FormContainerProps extends FormikConfig<FormikValues> {
  validate?: (values: any) => FormikErrors<FormikValues>;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  validate,
  children,
  ...props
}) => (
  <Formik validate={validate} {...props}>
    <FormikForm>
      <Form as={"div"}>{children}</Form>
    </FormikForm>
  </Formik>
);
