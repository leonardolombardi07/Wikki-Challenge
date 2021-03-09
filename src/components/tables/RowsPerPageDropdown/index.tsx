import React from "react";
import { Dropdown } from "semantic-ui-react";
// Types
import { DropdownProps, DropdownItemProps } from "semantic-ui-react";

const limitOptions: DropdownItemProps[] = [
  { key: "0", value: 5, text: "5" },
  { key: "1", value: 10, text: "10" },
  { key: "2", value: 25, text: "25" },
  { key: "3", value: 50, text: "50" },
];

interface RowsPerPageDropdownProps {
  message: string;
  limit: number;
  onChangeLimit: (limit: number) => void;
}

export const RowsPerPageDropdown: React.FC<RowsPerPageDropdownProps> = ({
  message,
  limit,
  onChangeLimit,
}) => {
  const handleChangeLimit = (
    event: React.SyntheticEvent<HTMLElement>,
    { value }: DropdownProps
  ) => {
    onChangeLimit(value as number);
  };
  return (
    <React.Fragment>
      {message}{" "}
      <Dropdown
        inline={true}
        options={limitOptions}
        defaultValue={limit}
        onChange={handleChangeLimit}
      />
    </React.Fragment>
  );
};
