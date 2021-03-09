import React from "react";
// Components
import { Grid, Header, Segment, Divider } from "semantic-ui-react";
// Types
import { SemanticICONS } from "semantic-ui-react";

interface PageHeadlineProps {
  icon: SemanticICONS;
  title: string;
}

export const HeadlineWithRightContent: React.FunctionComponent<PageHeadlineProps> = ({
  icon,
  title,
  children,
}) => {
  return (
    <React.Fragment>
      <Grid stackable padded={"horizontally"}>
        <Grid.Column floated="left" width={5} verticalAlign={"middle"}>
          <Header as="h2" icon={icon} content={title} />
        </Grid.Column>
        <Grid.Column
          floated="right"
          width={5}
          stretched
          verticalAlign={"middle"}
        >
          <Segment.Inline>{children}</Segment.Inline>
        </Grid.Column>
      </Grid>
      <Divider />
    </React.Fragment>
  );
};
