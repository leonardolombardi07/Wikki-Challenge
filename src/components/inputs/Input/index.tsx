import React from "react";
// Hooks
import { useField } from "formik";
// Components
import { Form } from "semantic-ui-react";
import { StyledInputErrorMessage } from "./styles";
// Types
import { FormikHandlers } from "formik";
import { LabelProps } from "semantic-ui-react";
import { SemanticShorthandItem } from "semantic-ui-react/dist/commonjs/generic";

interface InputProps {
  value?: string;
  name: string;
  placeholder?: string;
  onChange?: FormikHandlers["handleChange"];
  onBlur?: FormikHandlers["handleBlur"];
  label?: SemanticShorthandItem<LabelProps>;
  icon?: string;
  type?: string;
  validate?: (value: string) => string;
}

export const Input: React.FC<InputProps> = (props) => {
  const [field, meta] = useField(props);
  const hasErrors = Boolean(meta.touched && meta.error);
  return (
    <>
      <Form.Input fluid error={hasErrors} {...props} {...field} />
      <StyledInputErrorMessage>
        {hasErrors && meta.error}
      </StyledInputErrorMessage>
    </>
  );
};

export * from "./styles";
