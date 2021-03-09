import styled from "styled-components";
// Mixins
import { hideOnMobileMixin } from "../../../styles";
// Components
import { Menu } from "semantic-ui-react";

export const SemanticMenu = styled(Menu)`
  background-color: ${({ theme }) => theme.colors.primary} !important;
  border-radius: 0px !important;
  padding-right: 10px !important;
  height: 60px !important;
  width: 100vw !important;
`;

export const HeaderMenuItem = styled(Menu.Item)`
  color: ${({ theme }) => theme.colors.primaryContrast} !important;
  font-weight: bold !important;
  font-size: 1em !important;
`;

export const DesktopHeaderItemsContainer = styled.div`
  ${hideOnMobileMixin};
  display: inherit;
`;
