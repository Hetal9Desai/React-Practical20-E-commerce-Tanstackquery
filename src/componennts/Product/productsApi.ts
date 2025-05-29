import axios from "axios";
import type { Product } from "../../types/Product";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
const BASE = `${API_URL}/products`;

export const fetchProducts = (ownerId: string) =>
  axios.get<Product[]>(BASE, { params: { ownerId } }).then((res) => res.data);

export const fetchProduct = (id: string, ownerId: string) =>
  axios
    .get<Product>(`${BASE}/${id}`, { params: { ownerId } })
    .then((res) => res.data);

export const createProduct = (p: Omit<Product, "id">) =>
  axios.post<Product>(BASE, p).then((res) => res.data);

export const updateProduct = (id: string, upd: Partial<Product>) =>
  axios.put<Product>(`${BASE}/${id}`, upd).then((res) => res.data);

export const deleteProduct = (id: string | number) =>
  axios.delete<void>(`${BASE}/${id}`).then((res) => res.data);
