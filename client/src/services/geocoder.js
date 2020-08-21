import axios from "axios";

const api = axios.create({
  baseURL: "https://api.opencagedata.com/",
  withCredentials: true,
});

export const getCoordinates = (address) => {
  const array = address.split(" ");
  const string = array.join("+");
  api.get(`geocode/v1/json?q=${string}&limit=1&key=${process.env.REACT_APP_OPEN_CAGE_API_KEY}`).then((response) => {
    console.log(response);
    return response.data;
  });
};
