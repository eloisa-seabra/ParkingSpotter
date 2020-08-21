import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
  withCredentials: true
});

export const signUp = body => api.post('/authentication/sign-up', body).then(response => response.data);

export const signIn = body => api.post('/authentication/sign-in', body).then(response => response.data);

export const signOut = () => api.post('/authentication/sign-out').then(response => response.data);

export const loadMe = () => api.get('/authentication/me').then(response => response.data);

export const loadProfile = () => api.get('/profile').then(response => response.data);

export const editProfile = body => api.patch('/profile/edit', body).then(response => response.data);
