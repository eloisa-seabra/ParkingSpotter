import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/parking`,
  withCredentials: true,
});

export const loadParking = (param) => {
  return api
    .get("/list", {
      params: {
        coordinates: param,
      },
    })
    .then((response) => {
      return response.data;
    });
};
export const createParking = (body) => {
  const formBody = new window.FormData();
  for (let property in body) {
    formBody.append(property, body[property]);
  }
  return api.post("/create", formBody).then((response) => response.data);
};

export const loadSingleParking = (id) => api.get(`/${id}`).then((response) => response.data);

export const deleteSingleParking = (id) => api.delete(`/${id}`).then((response) => response.data);

export const editSingleParking = (id, body) => api.patch(`/${id}`, body).then((response) => response.data);
