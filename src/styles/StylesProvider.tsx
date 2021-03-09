import React from "react";
// Hooks
import { useSelector } from "../redux";
// Components
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./GlobalStyles";
// Redux
import { selectTheme } from "../redux/user";

export const StylesProvider: React.FC = ({ children }) => {
  const theme = useSelector(selectTheme);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};
