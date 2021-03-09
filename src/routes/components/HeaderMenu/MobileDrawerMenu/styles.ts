import styled from "styled-components";
// Styles
import { hideOnDesktopMixin } from "../../../../styles";
// Components
import { Menu } from "semantic-ui-react";
import { Button, Icon } from "semantic-ui-react";

export const DrawerMenuContainer = styled.div`
  ${hideOnDesktopMixin}
  display: flex;
  align-items: center;
`;

export const HamburguerButton = styled(Button)`
  background-color: transparent !important;
  margin-left: 5px !important;
`;

export const HamburguerIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.primaryContrast} !important;
`;

export const DrawerItemsContainer = styled(Menu)`
  flex: 1 !important;
  width: 70vw !important;
  background-color: ${({ theme }) => theme.colors.background} !important;
  opacity: 0.85 !important;
`;
