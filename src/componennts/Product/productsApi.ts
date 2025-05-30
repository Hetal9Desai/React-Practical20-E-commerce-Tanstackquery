import axios from "axios";
import type { Product } from "../../types/Product";

const BASE = import.meta.env.VITE_API_BASE;

export const fetchProducts = (ownerId: string) =>
  axios
    .get<Product[]>(`${BASE}/products`, { params: { ownerId } })
    .then((res) => res.data);

export const fetchProduct = (id: string, ownerId: string) =>
  axios
    .get<Product>(`${BASE}/products/${id}`, { params: { ownerId } })
    .then((res) => res.data);

export const createProduct = (p: Omit<Product, "id">) =>
  axios.post<Product>(`${BASE}/products`, p).then((res) => res.data);

export const updateProduct = (id: string, upd: Partial<Product>) =>
  axios.put<Product>(`${BASE}/products/${id}`, upd).then((res) => res.data);

export const deleteProduct = (id: string | number) =>
  axios.delete<void>(`${BASE}/products/${id}`).then((res) => res.data);
