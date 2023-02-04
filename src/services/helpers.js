import axios from "axios";

const BASE_URL = "http://localhost:3001/persons";

export const getAll = async () => {
  const request = axios.get(BASE_URL);
  return request.then((response) => response.data);
};

export const create = (person) => {
  const request = axios.post(BASE_URL, person);
  return request.then((response) => response.data);
};

export const update = (id, person) => {
  const request = axios.put(`${BASE_URL}/${id}`, person);
  return request.then((response) => response.data);
};
