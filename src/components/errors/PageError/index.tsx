import React from "react";
import { Message, Button } from "semantic-ui-react";

interface PageErrorProps {
  title: string;
  description: string;
  buttonText?: string;
  onClickButton?: () => void;
}

export const PageError: React.FC<PageErrorProps> = ({
  title,
  description,
  buttonText,
  onClickButton,
}) => {
  return (
    <Message negative>
      <Message.Header>{title}</Message.Header>
      <p>{description}</p>
      <Button onClick={onClickButton}>
        {buttonText || "Tentar novamente"}
      </Button>
    </Message>
  );
};
