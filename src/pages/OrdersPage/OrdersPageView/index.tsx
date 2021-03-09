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
  NotAuthenticatedView,
  EmptySearch,
} from "../../../components";
import { SearchOrdersInput } from "../SearchOrdersInput";
import { AddOrderModal } from "../AddOrderModal";
import { OrdersTable } from "../OrdersTable";

interface OrdersPageViewProps {
  isAuthenticated: boolean;
  showPageError: boolean;
  showLoadingPlaceholder: boolean;
  showEmptySearchMessage: boolean;
  onCleanQuery: () => void;
}

export const OrdersPageView: React.FC<OrdersPageViewProps> = ({
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
        description={"Não foi possível obter seus pedidos"}
      />
    );
  }

  return (
    <Segment style={{ padding: "2em" }} vertical>
      <HeadlineWithRightContent icon={"truck"} title={"Pedidos"}>
        <SearchOrdersInput />
        <Can I="create" a="Order">
          <AddOrderModal />
        </Can>
      </HeadlineWithRightContent>

      <Suspenser
        condition={showLoadingPlaceholder}
        loadingPlaceholder={
          <TablePlaceholder numOfRows={4} numOfColumns={4} />
        }
      >
        {!isAuthenticated ? (
          <NotAuthenticatedView
            title={"Usuário não autenticado"}
            description={
              "Você só pode visualizar os pedidos se estiver logado no sistema"
            }
          />
        ) : showEmptySearchMessage ? (
          <EmptySearch
            message={"Nenhum pedido encontrado"}
            onCleanQuery={onCleanQuery}
          />
        ) : (
          <OrdersTable />
        )}
      </Suspenser>
    </Segment>
  );
};
