import React from "react";
// Hooks
import { useFetchOrders } from "./useFetchOrders";
import { useSearchOrders } from "./useSearchOrders";
// Components
import { OrdersPageView } from "./OrdersPageView";
// Types
import { RequestStatus } from "../../types/redux";

const OrdersPage: React.FC = () => {
  const { isAuthenticated, status, isEmptyOrders } = useFetchOrders();
  const { isEmptySearch, resetSearchQuery } = useSearchOrders();
  return (
    <OrdersPageView
      isAuthenticated={isAuthenticated}
      showLoadingPlaceholder={
        isEmptyOrders && status === RequestStatus.PENDING
      }
      showPageError={isEmptyOrders && status === RequestStatus.REJECTED}
      showEmptySearchMessage={isEmptySearch}
      onCleanQuery={resetSearchQuery}
    />
  );
};

export default OrdersPage;
