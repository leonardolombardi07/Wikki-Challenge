import styled from "styled-components";

export const StyledInputErrorMessage = styled.p`
  font-size: 9px !important;
  font-weight: bold !important;
  margin-top: -14px !important;
  margin-bottom: 10px !important;
  float: left !important;
  height: 5px !important;
  color: ${({ theme }) => theme.colors.primary} !important;
`;
