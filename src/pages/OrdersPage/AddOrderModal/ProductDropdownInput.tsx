import React, { useState } from "react";
// Hooks
import { useSelector } from "react-redux";
// Components
import { Dropdown } from "semantic-ui-react";
// Redux
import { selectProducts } from "../../../redux/products";
// Types
import { Product } from "../../../services/apis/WikkiApi";

interface ProductsDropdownInputProps {
  onChangeOrSelect: (product: string | Product) => void;
}

interface ProductOption {
  key: string;
  value: string;
  text: string;
}

const useProductsOptions = () => {
  const products = useSelector(selectProducts);
  const formattedProducts = products.map((product) => ({
    key: product.id,
    value: product.name,
    text: product.name,
  }));
  const [options, setOptions] = useState<ProductOption[]>(
    formattedProducts
  );
  const addProductOption = (newOption: ProductOption) => {
    setOptions([newOption, ...options]);
  };
  return { options, addProductOption };
};

export const ProductDropdownInput: React.FC<ProductsDropdownInputProps> = ({
  onChangeOrSelect,
}) => {
  const { options, addProductOption } = useProductsOptions();
  const [inputValue, setInputValue] = useState("");
  return (
    <Dropdown
      options={options}
      placeholder="Selecione um produto"
      additionLabel={"Adicionar produto: "}
      noResultsMessage={"Ou digite para criar um novo produto."}
      lazyLoad
      search
      selection
      fluid
      allowAdditions
      value={inputValue}
      onAddItem={(e, { value }) => {
        addProductOption({
          key: String(Math.random() * 23),
          value: value as string,
          text: value as string,
        });
      }}
      onChange={(e, { value }) => {
        setInputValue(value as string);
        onChangeOrSelect(value as string | Product);
      }}
      style={{ marginVertical: 10 }}
    />
  );
};
