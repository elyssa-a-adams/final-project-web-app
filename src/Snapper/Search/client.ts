import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const SEARCH_API = `${API_BASE}/api/search`;
const api = axios.create({
  withCredentials: true,
});
export const findAnimalsByName = async (animal: string) => {
  const response = await api.get(`${SEARCH_API}?animal=${animal}`);
  return response.data;
};
