import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE;

export interface UserRecord {
  id: string;
  fullName?: string;
  email: string;
  password: string;
}

export const fetchUsers = () =>
  axios.get<UserRecord[]>(`${BASE}/users`).then((res) => res.data);

export interface SignupCredentials {
  fullName: string;
  email: string;
  password: string;
}

export const register = (userData: SignupCredentials) =>
  axios.post<UserRecord>(`${BASE}/users`, userData).then((res) => res.data);
