import axios from "axios";

export const addOrder = (order) => {
  return axios.post("http://localhost:5000/order/create", order);
};
