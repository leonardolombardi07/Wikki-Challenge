// Redux
import { createAsyncThunk } from "@reduxjs/toolkit";
// Services
import * as WikkiApi from "../../services/apis/WikkiApi";
// Types
import { Product } from "../../services/apis/WikkiApi";
// Types
import { AddProductForm } from "./types";

interface FetchProductsReturn {
  products: Product[];
}

export const fetchProducts = createAsyncThunk<
  FetchProductsReturn,
  undefined,
  { rejectValue: string }
>("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const products = await WikkiApi.fetchProducts();
    return { products };
  } catch (error) {
    return rejectWithValue(error.messsage);
  }
});

export const addProduct = createAsyncThunk<
  Product,
  AddProductForm,
  { rejectValue: string }
>("orders/addProduct", async (addProductForm, { rejectWithValue }) => {
  try {
    const createdProduct = await WikkiApi.addProduct(addProductForm);
    return createdProduct;
  } catch (error) {
    return rejectWithValue(error.messsage);
  }
});

export const deleteProduct = createAsyncThunk<
  Product,
  Product,
  { rejectValue: string }
>("orders/deleteProduct", async (product, { rejectWithValue }) => {
  try {
    const deletedProduct = await WikkiApi.deleteProduct(product);
    return deletedProduct;
  } catch (error) {
    return rejectWithValue(error.messsage);
  }
});

export const editProduct = createAsyncThunk<
  Product,
  Product,
  { rejectValue: string }
>("orders/editProduct", async (productFields, { rejectWithValue }) => {
  try {
    const editedProduct = await WikkiApi.editProduct(productFields);
    return editedProduct;
  } catch (error) {
    return rejectWithValue(error.messsage);
  }
});
