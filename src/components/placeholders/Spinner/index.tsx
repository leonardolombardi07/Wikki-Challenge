import React from "react";
// Components
import { Loader, LoaderProps } from "semantic-ui-react";

interface SpinnerProps extends LoaderProps {}

export const Spinner: React.FC<SpinnerProps> = ({
  children,
  ...props
}) => {
  return (
    <Loader active {...props}>
      {children}
    </Loader>
  );
};
