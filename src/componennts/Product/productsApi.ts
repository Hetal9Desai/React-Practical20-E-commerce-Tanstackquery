import axios from "axios";
import type { Product } from "../../types/Product";

const URL = "https://backend-2-38us.onrender.com/products";

export const fetchProducts = (ownerId: string) =>
  axios.get<Product[]>(URL, { params: { ownerId } }).then((res) => res.data);

export const fetchProduct = (id: string, ownerId: string) =>
  axios
    .get<Product>(`${URL}/${id}`, { params: { ownerId } })
    .then((res) => res.data);

export const createProduct = (p: Omit<Product, "id">) =>
  axios.post<Product>(URL, p).then((res) => res.data);

export const updateProduct = (id: string, upd: Partial<Product>) =>
  axios.put<Product>(`${URL}/${id}`, upd).then((res) => res.data);

export const deleteProduct = (id: string | number) =>
  axios.delete<void>(`${URL}/${id}`).then((res) => res.data);
