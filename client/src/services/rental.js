import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/rental`,
  withCredentials: true,
});

export const createNewRental = (body) => api.post(`/`, body).then((response) => response.data);

export const endRental = (id, body) => api.patch(`/${id}`, body).then((response) => response.data);

//export const submitPayment = (payment) => api.post("/payment", payment).then((response) => response.data);

export const loadRental = () => api.get("/").then((response) => response.data);
