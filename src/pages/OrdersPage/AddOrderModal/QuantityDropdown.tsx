import React from "react";
// Components
import { Dropdown } from "semantic-ui-react";
// Utils
import _ from "lodash";

interface QuantityDropdownProps {
  onChange: (num: number) => void;
}

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 30;
const options = _.range(MIN_QUANTITY, MAX_QUANTITY + 1).map((n) => ({
  key: String(n),
  value: n,
  text: String(n),
}));

export const QuantityDropdown: React.FC<QuantityDropdownProps> = ({
  onChange,
}) => (
  <Dropdown
    icon={"dropdown"}
    labeled
    lazyLoad
    selection
    fluid
    placeholder={"Selecione uma quantidade"}
    options={options}
    onChange={(_, { value }) => {
      onChange(value as number);
    }}
  />
);
