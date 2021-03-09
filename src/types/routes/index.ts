export enum RoutePaths {
  ProductsPage = "/",
  OrdersPage = "/pedidos",
}

export interface Route {
  pathname: RoutePaths;
  label: string;
}
