import { AxiosResponse } from "axios";

import { WikkiApiWithAuth } from "../config";
import { Product, Order, GithubApiUser } from "../types";

export const fetchOrders = async (): Promise<Order[]> => {
  try {
    const {
      data,
    }: AxiosResponse<GithubApiUser[]> = await WikkiApiWithAuth.get(
      "/users"
    );

    const orders: Order[] = data.map(({ id, node_id, type }) => {
      const fakeProduct: Product = {
        id: String(id),
        code: String(id),
        name: type,
        price: id,
      };

      return {
        id: String(node_id),
        code: String(node_id),
        product: fakeProduct,
        quantity: Number(id),
      };
    });
    return orders;
  } catch (error) {
    throw error;
  }
};
