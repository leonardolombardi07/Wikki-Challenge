import { WikkiApiWithAuth } from "../config";
// Types
import { Product } from "../types";

interface AddProductDTO {
  name: string;
  price: number;
}

export const addProduct = async (
  addProductDTO: AddProductDTO
): Promise<Product> => {
  try {
    const { name, price } = addProductDTO;
    // We need to actually make a post request sending
    // addProductDTO to the right endpoint, and receive the
    // added product as response
    await WikkiApiWithAuth.get("/users");
    const fakeProduct: Product = {
      id: String(Math.random() * 32),
      code: String(Math.random() * 32),
      name,
      price,
    };
    return fakeProduct;
  } catch (error) {
    throw error;
  }
};
