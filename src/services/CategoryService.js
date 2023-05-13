import axios from "axios";

export const getCategory = () => {
  return axios.post("http://localhost:5000/category/getAll");
};
