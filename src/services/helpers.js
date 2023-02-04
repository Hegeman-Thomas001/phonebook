import axios from "axios";

const BASE_URL = "http://localhost:3001/persons";

export const getAll = async () => {
  try {
    const { data } = await axios.get(BASE_URL);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const create = async (person) => {
  try {
    const { data } = await axios.post(BASE_URL, person);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const update = async (id, person) => {
  try {
    const { data } = await axios.put(`${BASE_URL}/${id}`, person);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const remove = async (id) => {
  try {
    const { status } = await axios.delete(`${BASE_URL}/${id}`);

    return status;
  } catch (error) {
    console.log(error);
  }
};
