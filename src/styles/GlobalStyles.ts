import { createGlobalStyle } from "styled-components";
// Types
import { ThemeProps, Theme } from "styled-components";

export const GlobalStyles = createGlobalStyle<ThemeProps<Theme>>`
  body, html {
    margin: 0;
    height: 100%;
    max-width: 100%;
    background: ${({ theme }) => theme.colors.background};
    font-family: 'Lato', sans-serif;
    box-sizing: border-box;
  }

  a {
    font-size: 10px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Lato", sans-serif;
    margin-bottom: 0px;
  }
  
  ::-webkit-scrollbar {
    width: 3px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: 10px;
  }
`;
