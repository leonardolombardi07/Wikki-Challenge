import React from "react";
// Components
import { Segment, Header, Button, Icon } from "semantic-ui-react";

export interface EmptySearchProps {
  message: string;
  onCleanQuery: () => void;
}

export const EmptySearch: React.FC<EmptySearchProps> = ({
  message,
  onCleanQuery,
}) => (
  <Segment placeholder>
    <Header icon>
      <Icon name="search" />
      {message}
    </Header>
    <Segment.Inline>
      <Button onClick={onCleanQuery} primary>
        Limpar busca
      </Button>
    </Segment.Inline>
  </Segment>
);
