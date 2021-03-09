import React from "react";
// Components
import { Button } from "semantic-ui-react";
// Types
import { ButtonProps } from "semantic-ui-react";

interface OutlinedButtonProps extends ButtonProps {}

export const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Button size={"mini"} {...props} inverted>
      {children}
    </Button>
  );
};
