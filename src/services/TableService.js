import axios from "axios";

export const getTable = () => {
  return axios.post("http://localhost:5000/table/getAll");
};
