import "styled-components";

declare module "styled-components" {
  export interface Theme {
    colors: {
      background: string;
      primary: string;
      secondary: string;
      primaryContrast: string;
    };

    MOBILE_BREAKPOINT: string;
  }
}
