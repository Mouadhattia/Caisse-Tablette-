import {
  fetchSupplements,
  getOneProducts,
  getProduct,
  getProducts,
} from "../../services/ProductService.";

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_PRODUCTS_BY_CAT = "GET_PRODUCTS_BY_CAT";
export const GET_PRODUCTS_BY_ID = "GET_PRODUCTS_BY_ID";
export const GET_SUPPLEMENTS = "GET_SUPPLEMENTS";

export function ProductByCatAction(catId) {
  return (dispatch) => {
    getProduct(catId)
      .then((response) => {
        dispatch(getProductsByCat(response.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
export function ProductAction() {
  return (dispatch) => {
    getProducts()
      .then((response) => {
        dispatch(getAllProducts(response.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
export function ProductByIdAction(id) {
  return (dispatch) => {
    getOneProducts(id)
      .then((response) => {
        dispatch(getProductById(response.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
export function SupplmentsAction(id) {
  return (dispatch) => {
    fetchSupplements(id)
      .then((response) => {
        dispatch(getSupplements(response.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getProductsByCat(payload) {
  return {
    type: GET_PRODUCTS_BY_CAT,
    payload,
  };
}
export function getAllProducts(payload) {
  return {
    type: GET_ALL_PRODUCTS,
    payload,
  };
}
export function getProductById(payload) {
  return {
    type: GET_PRODUCTS_BY_ID,
    payload,
  };
}
export function getSupplements(payload) {
  return {
    type: GET_SUPPLEMENTS,
    payload,
  };
}
