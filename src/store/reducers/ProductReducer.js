import {
  GET_ALL_PRODUCTS,
  GET_PRODUCTS_BY_CAT,
  GET_PRODUCTS_BY_ID,
  GET_SUPPLEMENTS,
} from "../actions/ProductActions";

const initialState = {
  products: [],
  product: {},
  supplments: [],
};

export function ProductReducer(state = initialState, action) {
  if (action.type === GET_PRODUCTS_BY_CAT) {
    return {
      ...state,
      products: action.payload,
    };
  }
  if (action.type === GET_ALL_PRODUCTS) {
    return {
      ...state,
      products: action.payload,
    };
  }
  if (action.type === GET_PRODUCTS_BY_ID) {
    return {
      ...state,
      product: action.payload,
    };
  }
  if (action.type === GET_SUPPLEMENTS) {
    return {
      ...state,
      supplments: action.payload,
    };
  }

  return state;
}
