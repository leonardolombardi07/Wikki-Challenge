import React from "react";
// Hooks
import { useActions } from "../../../redux";
// Components
import { Segment, Header, Button, Icon } from "semantic-ui-react";

import { ModalTypeEnum } from "../../../types/redux";

export interface NotAuthenticatedViewProps {
  title: string;
  description: string;
}

export const NotAuthenticatedView: React.FC<NotAuthenticatedViewProps> = ({
  title,
  description,
}) => {
  const { openModal } = useActions();
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="shield alternate" />
        {title}
        <Header.Subheader style={{ marginTop: -20, marginBottom: 5 }}>
          {description}
        </Header.Subheader>
      </Header>

      <Segment.Inline>
        <Button
          onClick={() =>
            openModal({ modalType: ModalTypeEnum.SIGN_IN_MODAL })
          }
          primary
        >
          Entrar
        </Button>
      </Segment.Inline>
    </Segment>
  );
};
