// Redux
import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectIsAuthenticated } from "../auth";
// Services
import * as WikkiApi from "../../services/apis/WikkiApi";
// Types
import { Order, Product } from "../../services/apis/WikkiApi";
import { AddOrderForm } from "./types";

interface FetchOrdersReturn {
  orders: Order[];
}

export const fetchOrders = createAsyncThunk<
  FetchOrdersReturn,
  undefined,
  { rejectValue: string }
>(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const orders = await WikkiApi.fetchOrders();
      return { orders };
    } catch (error) {
      return rejectWithValue(error.messsage);
    }
  },
  {
    // We need to correctly type the getState to return RootState
    condition: (_, { getState }) => {
      const state: any = getState();
      const isAuthenticated = selectIsAuthenticated(state);
      if (!isAuthenticated) {
        return true; // Change to 'false' when need to make this work
      }
    },
  }
);

interface AddOrderReturn {
  order: Order;
  product: Product;
}

export const addOrder = createAsyncThunk<
  AddOrderReturn,
  AddOrderForm,
  { rejectValue: string }
>("orders/addOrder", async (addOrderForm, { rejectWithValue }) => {
  try {
    const createdOrder = await WikkiApi.addOrder(addOrderForm);
    return { order: createdOrder, product: createdOrder.product };
  } catch (error) {
    return rejectWithValue(error.messsage);
  }
});

export const deleteOrder = createAsyncThunk<
  Order,
  Order,
  { rejectValue: string }
>("orders/deleteOrder", async (order, { rejectWithValue }) => {
  try {
    const deletedOrder = await WikkiApi.deleteOrder(order);
    return deletedOrder;
  } catch (error) {
    return rejectWithValue(error.messsage);
  }
});
