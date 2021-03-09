import { WikkiApiWithAuth } from "../config";
// Types
import { Order, Product } from "../types";

interface AddOrderDTO {
  product: Product | string;
  quantity: number;
}

export const addOrder = async (
  addOrderDTO: AddOrderDTO
): Promise<Order> => {
  try {
    const { product, quantity } = addOrderDTO;
    // We need to actually make a post request sending
    // addOrderDTO to the right endpoint, and receive the
    // added order as response
    await WikkiApiWithAuth.get("/users");
    const fakeProduct: Product = {
      id: String(Math.random() * 32),
      code: String(Math.random() * 32),
      name: typeof product === "string" ? product : "Random",
      price: Math.random() * 20,
    };
    const fakeOrder: Order = {
      id: String(Math.random() * 32),
      code: String(Math.random() * 32),
      product: fakeProduct,
      quantity,
    };
    return fakeOrder;
  } catch (error) {
    throw error;
  }
};
