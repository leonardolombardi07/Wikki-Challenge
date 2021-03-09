import React from "react";
// Components
import { SearchInput } from "../../../components";
import { useLocationChange } from "../../../routes";
// Hooks
import { useSearchProducts } from "../useSearchProducts";

export const SearchProductsInput: React.FC = () => {
  const {
    resetSearchQuery,
    searchQuery,
    searchProducts,
  } = useSearchProducts();

  useLocationChange({
    cleanup: () => resetSearchQuery(),
  });

  return (
    <SearchInput
      value={searchQuery}
      placeholder={"Pesquisar"}
      onChange={({ target: { value: query } }) => {
        searchProducts({ query });
      }}
    />
  );
};
