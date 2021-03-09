import { WikkiApiWithAuth } from "../config";
// Types
import { Product } from "../types";

export const deleteProduct = async (
  product: Product
): Promise<Product> => {
  try {
    // We need to actually make a DELETE request to
    // the right endpoint, and receive the deleted
    // order as response
    await WikkiApiWithAuth.get("/users");
    return product;
  } catch (error) {
    throw error;
  }
};
