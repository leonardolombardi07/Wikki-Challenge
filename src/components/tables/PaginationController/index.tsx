import React from "react";
// Components
import { Pagination, Icon } from "semantic-ui-react";
// Types
import { PaginationProps } from "semantic-ui-react";

interface PaginationControllerProps extends PaginationProps {}

export const PaginationController: React.FC<PaginationControllerProps> = ({
  totalPages,
  ...props
}) => {
  return (
    <Pagination
      totalPages={totalPages}
      // UI
      ellipsisItem={{
        content: <Icon name="ellipsis horizontal" />,
        icon: true,
      }}
      firstItem={{
        content: <Icon name="angle double left" />,
        icon: true,
      }}
      lastItem={{
        content: <Icon name="angle double right" />,
        icon: true,
      }}
      prevItem={{
        content: <Icon name="angle left" />,
        icon: true,
      }}
      nextItem={{
        content: <Icon name="angle right" />,
        icon: true,
      }}
      {...props}
    />
  );
};
