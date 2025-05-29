import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
const BASE = `${API_URL}/users`;

export interface UserRecord {
  id: string;
  fullName?: string;
  email: string;
  password: string;
}

export const fetchUsers = () => axios.get<UserRecord[]>(BASE);

export interface SignupCredentials {
  fullName: string;
  email: string;
  password: string;
}

export const register = (userData: SignupCredentials) =>
  axios.post<UserRecord>(BASE, userData);
