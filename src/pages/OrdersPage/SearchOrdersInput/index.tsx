import React from "react";
// Components
import { SearchInput } from "../../../components";
import { useLocationChange } from "../../../routes";
// Hooks
import { useSearchOrders } from "../useSearchOrders";

export const SearchOrdersInput: React.FC = () => {
  const {
    resetSearchQuery,
    searchQuery,
    searchOrders,
  } = useSearchOrders();

  useLocationChange({
    cleanup: () => resetSearchQuery(),
  });

  return (
    <SearchInput
      value={searchQuery}
      placeholder={"Pesquisar"}
      onChange={({ target: { value: query } }) => {
        searchOrders({ query });
      }}
    />
  );
};
