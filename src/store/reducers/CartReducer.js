import {
  ADD_ITEM_TO_CART,
  ADD_ITEM_QUANTITY,
  REMOVE_ITEM_QUANTITY,
  DELETE_ITEM,
  CLEAR_CART,
} from "../actions/CartActions";

const initialState = {
  cart: [],
};

export function CartReducer(state = initialState, action) {
  if (action.type === ADD_ITEM_TO_CART) {
    return {
      ...state,
      cart: [...state.cart, action.payload],
    };
  }
  if (action.type === REMOVE_ITEM_QUANTITY) {
    return {
      ...state,
      cart: state.cart.map((item) => {
        if (item.id == action.payload && item.qty > 0) {
          return { ...item, qty: item.qty - 1 };
        }
        return item;
      }),
    };
  }
  if (action.type === ADD_ITEM_QUANTITY) {
    return {
      ...state,
      cart: state.cart.map((item) => {
        if (item.id == action.payload) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      }),
    };
  }
  if (action.type === DELETE_ITEM) {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id != action.payload),
    };
  }
  if (action.type === CLEAR_CART) {
    return {
      ...state,
      cart: [],
    };
  }

  return state;
}
