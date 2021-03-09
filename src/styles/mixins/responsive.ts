import { css } from "styled-components";

export const hideOnMobileMixin = css`
  @media (max-width: ${({ theme }) => theme.MOBILE_BREAKPOINT}) {
    display: none;
  }
`;

export const hideOnDesktopMixin = css`
  @media (min-width: ${({ theme }) => theme.MOBILE_BREAKPOINT}) {
    display: none;
  }
`;

export const mobilePageMixin = css`
  @media (max-width: ${({ theme }) => theme.MOBILE_BREAKPOINT}) {
    width: 100vw;
    height: 100vh;
  }
`;
