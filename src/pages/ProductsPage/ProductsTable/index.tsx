import React, { useState } from "react";
// Hooks
import { useSelector } from "../../../redux";
import { useProductsPagination } from "./useProductsPagination";
import { useSortColumns } from "./useSortColumns";
import { useDeleteProduct } from "./useDeleteProduct";
import { useEditProductModal } from "./useEditProductModal";
// Authorization
import { Can } from "../../../authorization";
// Components
import { Table, Segment, Button } from "semantic-ui-react";
import {
  RowsPerPageDropdown,
  PaginationController,
  ConfirmActionModal,
} from "../../../components";
import { EditProductModal } from "./EditProductModal";
import { ProductDetailModal } from "../ProductDetailModal";
// Types
import { Product } from "../../../../src/services/apis/WikkiApi";
// Redux
import {
  ProductsTableColumns,
  selectVisibleProducts,
} from "../../../redux/products";
import { selectIsAuthenticated } from "../../../redux/auth";

interface CommonTableProps {
  products: Product[];
}

interface ProductsTableFooterProps {
  currentPage: number;
  totalPagesCount: number;
  changeCurrentProductsPage: (nextPage: number) => void;
}

export const ProductsTable: React.FC = () => {
  const visibleProducts = useSelector(selectVisibleProducts);
  const {
    currentPage,
    productsPerPage,
    changeProductsPerPage,
    changeCurrentProductsPage,
    totalPagesCount,
  } = useProductsPagination();
  return (
    <React.Fragment>
      <RowsPerPageDropdown
        message={"Produtos por página: "}
        onChangeLimit={(number) => changeProductsPerPage(number)}
        limit={productsPerPage}
      />

      <Segment stacked>
        <Table sortable celled fixed selectable>
          <TableHeader />
          <ProductRows products={visibleProducts} />
          <TableFooter
            currentPage={currentPage}
            totalPagesCount={totalPagesCount}
            changeCurrentProductsPage={changeCurrentProductsPage}
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
          sorted={sortIfIsColumnToSort(ProductsTableColumns.CODE)}
          onClick={() => handleSortColumn(ProductsTableColumns.CODE)}
        >
          Código
        </Table.HeaderCell>
        <Table.HeaderCell
          sorted={sortIfIsColumnToSort(ProductsTableColumns.PRODUCT)}
          onClick={() => handleSortColumn(ProductsTableColumns.PRODUCT)}
        >
          Produto
        </Table.HeaderCell>
        <Table.HeaderCell
          sorted={sortIfIsColumnToSort(ProductsTableColumns.PRICE)}
          onClick={() => handleSortColumn(ProductsTableColumns.PRICE)}
        >
          Preço
        </Table.HeaderCell>

        <Can I="create" a="Product">
          <Table.HeaderCell sorted={undefined} selectable={false}>
            Ações
          </Table.HeaderCell>
        </Can>
      </Table.Row>
    </Table.Header>
  );
};

const ProductRows: React.FC<CommonTableProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(
    null
  );
  const {
    isConfirmDeleteProductModalOpen,
    productToDelete,
    openConfirmModal,
    closeConfirmModal,
    deleteProduct,
    isLoading,
    error,
  } = useDeleteProduct();
  const { productToEdit, openEditProductModal } = useEditProductModal();
  return (
    <React.Fragment>
      <Table.Body>
        {products.map((product_) => {
          const { id, price, name, code } = product_;
          const selectProduct = () => {
            if (product_) setSelectedProduct(product_);
          };
          return (
            <Table.Row key={id}>
              <Table.Cell onClick={selectProduct}>{code}</Table.Cell>
              <Table.Cell onClick={selectProduct}>{name}</Table.Cell>
              <Table.Cell onClick={selectProduct}>{price}</Table.Cell>
              <Can I="create" a="Product">
                <Table.Cell
                  verticalAlign={"middle"}
                  selectable
                  textAlign={"center"}
                >
                  <Button
                    toggle
                    onClick={() => openEditProductModal(product_)}
                    icon={"edit"}
                  />

                  <Button
                    toggle
                    onClick={() => openConfirmModal(product_)}
                    icon={"trash"}
                  />
                </Table.Cell>
              </Can>
            </Table.Row>
          );
        })}
      </Table.Body>

      {productToEdit && <EditProductModal productToEdit={productToEdit} />}

      <ConfirmActionModal
        open={isConfirmDeleteProductModalOpen}
        onCancel={closeConfirmModal}
        onConfirm={() => {
          // This is bad code
          // 'productToDelete' can't be null,
          // yet typescript doesn't know that
          if (productToDelete) {
            deleteProduct(productToDelete);
          }
        }}
        header={`Deletando produto ${productToDelete?.code}`}
        content={"Tem certeza que deseja deletar este pedido?"}
        error={error}
        confirmButton={"Deletar"}
        loading={isLoading}
        cancelButton={"Cancelar"}
      />

      <ProductDetailModal
        open={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        selectedProduct={selectedProduct}
      />
    </React.Fragment>
  );
};

const TableFooter: React.FC<ProductsTableFooterProps> = ({
  currentPage,
  totalPagesCount,
  changeCurrentProductsPage,
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <Table.Footer>
      <Table.HeaderCell colSpan={isAuthenticated ? 4 : 3}>
        <Segment basic floated={"right"}>
          <PaginationController
            activePage={currentPage}
            totalPages={totalPagesCount}
            onPageChange={(e, { activePage }) => {
              changeCurrentProductsPage(activePage as number);
            }}
          />
        </Segment>
      </Table.HeaderCell>
    </Table.Footer>
  );
};
