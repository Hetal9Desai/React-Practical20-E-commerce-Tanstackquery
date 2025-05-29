import axios from "axios";

const BASE = "http://localhost:3001/users";

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
  axios.post(BASE, userData);
