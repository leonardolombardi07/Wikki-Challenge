import React, { useState } from "react";
// Hooks
import { useSelector } from "react-redux";
import { useOrdersPagination } from "./useOrdersPagination";
import { useSortColumns } from "./useSortColumns";
import { useDeleteOrder } from "./useDeleteOrder";
// Components
import { Table, Segment, Button } from "semantic-ui-react";
import {
  RowsPerPageDropdown,
  ConfirmActionModal,
  PaginationController,
} from "../../../components";
import { OrderDetailModal } from "../OrderDetailModal";
// Redux
import { selectVisibleOrders } from "../../../redux/orders";
// Types
import { OrdersTableColumns } from "../../../redux/orders";
import { Order } from "../../../../src/services/apis/WikkiApi";

interface CommonTableProps {
  orders: Order[];
}

interface OrdersTableFooterProps {
  currentPage: number;
  totalPagesCount: number;
  changeCurrentOrdersPage: (nextPage: number) => void;
}

export const OrdersTable: React.FC = () => {
  const visibleOrders = useSelector(selectVisibleOrders);
  const {
    currentPage,
    ordersPerPage,
    changeOrdersPerPage,
    changeCurrentOrdersPage,
    totalPagesCount,
  } = useOrdersPagination();
  return (
    <React.Fragment>
      <RowsPerPageDropdown
        message={"Pedidos por página: "}
        onChangeLimit={(number) => changeOrdersPerPage(number)}
        limit={ordersPerPage}
      />

      <Segment stacked>
        <Table sortable celled fixed selectable>
          <TableHeader />
          <OrderRows orders={visibleOrders} />
          <TableFooter
            currentPage={currentPage}
            totalPagesCount={totalPagesCount}
            changeCurrentOrdersPage={changeCurrentOrdersPage}
          />
        </Table>
      </Segment>
    </React.Fragment>
  );
};

const TableHeader: React.FC = () => {
  const { handleSortColumn, sortIfIsColumnToSort } = useSortColumns();
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell
          sorted={sortIfIsColumnToSort(OrdersTableColumns.CODE)}
          onClick={() => handleSortColumn(OrdersTableColumns.CODE)}
        >
          Código do Pedido
        </Table.HeaderCell>

        <Table.HeaderCell
          sorted={sortIfIsColumnToSort(OrdersTableColumns.DETAILS)}
          onClick={() => handleSortColumn(OrdersTableColumns.DETAILS)}
        >
          Detalhes
        </Table.HeaderCell>
        <Table.HeaderCell
          sorted={sortIfIsColumnToSort(OrdersTableColumns.QUANTITY)}
          onClick={() => handleSortColumn(OrdersTableColumns.QUANTITY)}
        >
          Quantidade
        </Table.HeaderCell>
        <Table.HeaderCell selectable={false}>Ações</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );
};

const OrderRows: React.FC<CommonTableProps> = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
  const {
    isConfirmDeleteOrderModalOpen,
    orderToDelete,
    openConfirmModal,
    closeConfirmModal,
    deleteOrder,
    isLoading,
    error,
  } = useDeleteOrder();
  return (
    <>
      <Table.Body>
        {orders.map((order_) => {
          const { id, code, product, quantity } = order_;
          const selectOrder = () => {
            if (order_) setSelectedOrder(order_);
          };
          return (
            <Table.Row key={id}>
              <Table.Cell onClick={selectOrder}>{code}</Table.Cell>
              <Table.Cell onClick={selectOrder}>
                <p>Produto {product.name}</p>
                <p>Código {product.code}</p>
              </Table.Cell>
              <Table.Cell onClick={selectOrder}>{quantity}</Table.Cell>
              <Table.Cell
                verticalAlign={"middle"}
                selectable
                textAlign={"center"}
              >
                <Button
                  toggle
                  onClick={() => openConfirmModal(order_)}
                  icon={"trash"}
                />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>

      <ConfirmActionModal
        open={isConfirmDeleteOrderModalOpen}
        onCancel={closeConfirmModal}
        onConfirm={() => {
          // This is bad code
          // 'orderToDelete' can't be null,
          // yet typescript doesn't know that
          if (orderToDelete) {
            deleteOrder(orderToDelete);
          }
        }}
        header={`Deletando pedido ${orderToDelete?.code}`}
        content={"Tem certeza que deseja deletar este pedido?"}
        error={error}
        confirmButton={"Deletar"}
        loading={isLoading}
        cancelButton={"Cancelar"}
      />

      <OrderDetailModal
        open={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        selectedOrder={selectedOrder}
      />
    </>
  );
};

const TableFooter: React.FC<OrdersTableFooterProps> = ({
  currentPage,
  totalPagesCount,
  changeCurrentOrdersPage,
}) => {
  return (
    <Table.Footer>
      <Table.HeaderCell colSpan="4">
        <Segment basic floated={"right"}>
          <PaginationController
            activePage={currentPage}
            totalPages={totalPagesCount}
            onPageChange={(e, { activePage }) => {
              changeCurrentOrdersPage(activePage as number);
            }}
          />
        </Segment>
      </Table.HeaderCell>
    </Table.Footer>
  );
};
