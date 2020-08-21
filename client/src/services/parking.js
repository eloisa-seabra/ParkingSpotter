import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/parking`,
  withCredentials: true,
});

export const loadParking = () => {
  api.get("/list").then((response) => response.data);
};
