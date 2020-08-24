import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/parking`,
  withCredentials: true
});

export const loadParking = () => {
  api.get('/list').then(response => response.data);
};

export const createParking = body => {
  api.post('/create', body).then(response => response.data);
};

export const loadSingleParking = id => api.get(`/${id}`).then(response => response.data);

export const deleteSingleParking = id => api.delete(`/${id}`).then(response => response.data);

export const editSingleParking = (id, body) => api.patch(`/${id}`, body).then(response => response.data);

export const searchParking = body => {
  api.get('/list', body).then(response => response.data);
};
