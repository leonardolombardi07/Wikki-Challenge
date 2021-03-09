import React from "react";
// Authorization
import { Can } from "../../../authorization";
// Components
import { Segment } from "semantic-ui-react";
import {
  PageError,
  HeadlineWithRightContent,
  Suspenser,
  TablePlaceholder,
  EmptySearch,
} from "../../../components";
import { SearchProductsInput } from "../SearchProductsInput";
import { AddProductModal } from "../AddProductModal";
import { ProductsTable } from "../ProductsTable";

interface ProductsPageViewProps {
  isAuthenticated: boolean;
  showPageError: boolean;
  showLoadingPlaceholder: boolean;
  showEmptySearchMessage: boolean;
  onCleanQuery: () => void;
}

export const ProductsPageView: React.FC<ProductsPageViewProps> = ({
  isAuthenticated,
  showPageError,
  showLoadingPlaceholder,
  showEmptySearchMessage,
  onCleanQuery,
}) => {
  if (showPageError) {
    return (
      <PageError
        title={"Algum erro ocorreu"}
        description={"Não foi possível obter seus produtos"}
      />
    );
  }

  const columnsToRenderOnPlaceholder = isAuthenticated ? 4 : 3;
  return (
    <Segment style={{ padding: "2em" }} vertical>
      <HeadlineWithRightContent icon={"box"} title={"Produtos"}>
        <SearchProductsInput />
        <Can I="create" a="Product">
          <AddProductModal />
        </Can>
      </HeadlineWithRightContent>

      <Suspenser
        condition={showLoadingPlaceholder}
        loadingPlaceholder={
          <TablePlaceholder
            numOfRows={4}
            numOfColumns={columnsToRenderOnPlaceholder}
          />
        }
      >
        {showEmptySearchMessage ? (
          <EmptySearch
            message={"Nenhum produto encontrado"}
            onCleanQuery={onCleanQuery}
          />
        ) : (
          <ProductsTable />
        )}
      </Suspenser>
    </Segment>
  );
};
