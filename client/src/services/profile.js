import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
  withCredentials: true
});

export const loadProfile = () => api.get('/profile').then(response => response.data);

export const editProfile = body => api.patch('/profile/edit', body).then(response => response.data);
