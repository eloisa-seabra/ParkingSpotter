import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/parking`,
  withCredentials: true
});

export const loadParking = () => {
  api.get('/list').then(response => response.data);
};

<<<<<<< HEAD
export const createParking = (body) => {
  api.post("/create", body).then((response) => response.data);
=======
export const uploadParking = body => {
  api.post('/create', body).then(response => response.data);
};

export const searchParking = body => {
  api.get('/list', body).then(response => response.data);
>>>>>>> 98559d69cf6c2d36aaa4b79a47def38326c1d1fb
};
