import axios from "axios";

export const getProduct = (catId) => {
  const data = {
    catId,
  };
  return axios.post("http://localhost:5000/product/getbyCat", data);
};
export const getProducts = () => {
  return axios.post("http://localhost:5000/product/getAll");
};
export const getOneProducts = (id) => {
  const data = {
    id: Number(id),
  };
  return axios.post("http://localhost:5000/product/getbyId", data);
};
export const fetchSupplements = (id) => {
  const data = {
    id: Number(id),
  };
  return axios.post("http://localhost:5000/supplement/getAll", data);
};
