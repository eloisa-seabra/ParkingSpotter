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

export const searchParking = body => {
  api.get('/list', body).then(response => response.data);
};
