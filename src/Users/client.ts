import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_API = `${API_BASE}/api/users`;
const api = axios.create({
  withCredentials: true,
});
export interface User {
  _id: string;
  username: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
}
export const signin = async (credentials: User) => {
  console.log("reached signin");
  const response = await api.post(`${USERS_API}/signin`, credentials);
  console.log("response", response.data);
  return response.data;
};
export const signup = async (user: any) => {
  console.log("reached signup");
  const response = await api.post(`${USERS_API}/signup`, user);
  console.log("response", response.data);
  return response.data;
};
export const updateUser = async (user: any) => {
  const response = await api.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};
export const profile = async () => {
  try {
    const response = await api.post(`${USERS_API}/profile`);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
export const findAllUsers = async () => {
  const response = await api.get(`${USERS_API}`);
  return response.data;
};
export const createUser = async (user: any) => {
  console.log(user);
  const response = await api.post(`${USERS_API}`, user);
  return response.data;
};
export const deleteUser = async (user: any) => {
  const response = await api.delete(`${USERS_API}/${user._id}`);
  return response.data;
};
export const signout = async () => {
  const response = await api.post(`${USERS_API}/signout`);
  return response.data;
};
export const findUsersByUsername = async (username: string) => {
  const response = await api.get(`${USERS_API}?username=${username}`);
  return response.data;
};
