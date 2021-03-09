export enum ValidFields {
  name = "name",
  email = "email",
  password = "password",
  product = "product",

  productName = "productName",
}

export interface ValidationObject {
  regex: RegExp;
  common: string;
  empty: string;
}
