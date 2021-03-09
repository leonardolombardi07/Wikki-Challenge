import React from "react";
// Components
import { Input } from "semantic-ui-react";
// Types
import { InputProps } from "semantic-ui-react";

interface SearchInputProps extends InputProps {}

export const SearchInput: React.FC<SearchInputProps> = ({
  onChangeDropdownItem,
  ...props
}) => {
  const inputProps = props as InputProps;
  return (
    <Input
      icon="search"
      iconPosition="left"
      placeholder="Buscar..."
      {...inputProps}
    />
  );
};
