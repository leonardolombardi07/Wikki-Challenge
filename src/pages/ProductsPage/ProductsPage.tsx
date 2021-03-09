import React from "react";
// Hooks
import { useSelector } from "../../redux";
import { useFetchProducts } from "./useFetchProducts";
import { useSearchProducts } from "./useSearchProducts";
// Components
import { ProductsPageView } from "./ProductsPageView";
// Redux
import { selectIsAuthenticated } from "../../redux/auth";
// Types
import { RequestStatus } from "../../types/redux";

const ProductsPage: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { status, isEmptyProducts } = useFetchProducts();
  const { isEmptySearch, resetSearchQuery } = useSearchProducts();
  return (
    <ProductsPageView
      isAuthenticated={isAuthenticated}
      showLoadingPlaceholder={
        isEmptyProducts && status === RequestStatus.PENDING
      }
      showPageError={isEmptyProducts && status === RequestStatus.REJECTED}
      showEmptySearchMessage={isEmptySearch}
      onCleanQuery={resetSearchQuery}
    />
  );
};

export default ProductsPage;
