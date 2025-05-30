import axios from "axios";

const BASE = "https://backend-2-38us.onrender.com/users";

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
