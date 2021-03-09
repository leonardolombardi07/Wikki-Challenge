import React from "react";
// Components
import { Table, Placeholder } from "semantic-ui-react";

interface TablePlaceholderProps {
  numOfRows: number;
  numOfColumns: number;
}

const Row = () => {
  return (
    <Placeholder>
      <Placeholder.Header>
        <Placeholder.Line />
      </Placeholder.Header>
    </Placeholder>
  );
};

export const TablePlaceholder: React.FC<TablePlaceholderProps> = ({
  numOfColumns,
  numOfRows,
}) => {
  const columns = Array.from({ length: numOfColumns }, (v, i) =>
    String(i)
  );
  const rows = Array.from({ length: numOfRows }, (v, i) => String(i));

  return (
    <Table>
      <Table.Header>
        {columns.map((column) => (
          <Table.HeaderCell key={column}>
            <Row key={column + "-"} />
          </Table.HeaderCell>
        ))}
      </Table.Header>

      <Table.Body>
        {columns.map((column) => (
          <Table.Cell key={column}>
            {rows.map((row) => (
              <Row key={row} />
            ))}
          </Table.Cell>
        ))}
      </Table.Body>
    </Table>
  );
};
