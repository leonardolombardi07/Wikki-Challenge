import { AxiosResponse } from "axios";

import { WikkiApi } from "../config";
import { Product, GithubApiUser } from "../types";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data }: AxiosResponse<GithubApiUser[]> = await WikkiApi.get(
      "/users"
    );

    const products: Product[] = data.map(({ id, type }) => ({
      id: String(id),
      code: String(id),
      name: type,
      price: id,
    }));
    return products;
  } catch (error) {
    throw error;
  }
};
