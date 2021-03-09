import React from "react";
// Styles
import styled from "styled-components";
// Components
import { Button } from "semantic-ui-react";
// Types
import { ButtonProps } from "semantic-ui-react";

interface SubmitButtonProps extends ButtonProps {}

const StyledSubmitButton = styled(Button)`
  background-color: ${({ theme: { colors }, disabled }) =>
    disabled ? colors.secondary : colors.primary} !important;
  color: ${({ theme }) => theme.colors.primaryContrast} !important;
`;

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <StyledSubmitButton fluid size="large" {...props}>
      {children}
    </StyledSubmitButton>
  );
};
