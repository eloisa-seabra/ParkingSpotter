import axios from "axios";

const api = axios.create({
  baseURL: "https://api.opencagedata.com/",
});

export const getCoordinates = async (address) => {
  const array = address.split(" ");
  const string = array.join("+");
  const endpoint = `geocode/v1/geojson?q=${string}&limit=1&key=${process.env.REACT_APP_OPEN_CAGE_API_KEY}`;
  let response = await api.get(endpoint);
  return response.data;
};
