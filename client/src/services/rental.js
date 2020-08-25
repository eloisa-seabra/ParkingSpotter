import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/rental`,
  withCredentials: true
});

export const createNewRental = body => api.post(`/`, body).then(response => response.data);

export const endRental = id => api.patch(`/${id}`).then(response => response.data);
