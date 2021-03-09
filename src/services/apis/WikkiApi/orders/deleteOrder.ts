import { WikkiApiWithAuth } from "../config";
// Types
import { Order } from "../types";

export const deleteOrder = async (order: Order): Promise<Order> => {
  try {
    // We need to actually make a DELETE request to
    // the right endpoint, and receive the deleted
    // order as response
    await WikkiApiWithAuth.get("/users");
    return order;
  } catch (error) {
    throw error;
  }
};
