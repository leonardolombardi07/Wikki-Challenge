/* This is just while we are
using GithubApi */
export interface GithubApiUser {
  id: number;
  login: string;
  type: string;
  node_id: string;
}
////////////////////

export interface User {
  name: string;
  email: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  price: number;
}

export interface Order {
  id: string;
  code: string;
  quantity: number;
  product: Product;
}
