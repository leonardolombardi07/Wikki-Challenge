// Types
import { Theme } from "styled-components";

const DefaultThemeValues = {
  MOBILE_BREAKPOINT: "500px",
};

export const MainTheme: Theme = {
  colors: {
    background: "#FFF5F1",
    primary: "#A7090A",
    secondary: "#BB8376",
    primaryContrast: "#FFFFFF",
  },
  ...DefaultThemeValues,
};

export const DarkTheme: Theme = {
  colors: {
    background: "#303030",
    primary: "rgba(255, 255, 255, 0.7)",
    secondary: "#A7090A",
    primaryContrast: "rgba(0, 0, 0, 0.87)",
  },
  ...DefaultThemeValues,
};
