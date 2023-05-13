export const ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART";
export const ADD_ITEM_QUANTITY = "ADD_ITEM_QUANTITY";
export const REMOVE_ITEM_QUANTITY = "REMOVE_ITEM_QUANTITY";
export const DELETE_ITEM = "DELETE_ITEM";
export const CLEAR_CART = "CLEAR_CART";

export function addItemAction(item) {
  return (dispatch) => {
    dispatch(addItem(item));
  };
}
export function addQuntityAction(id) {
  return (dispatch) => {
    dispatch(addQuntity(id));
  };
}
export function removeQuntityAction(id) {
  return (dispatch) => {
    dispatch(removeQuntity(id));
  };
}
export function deleteItemAction(id) {
  return (dispatch) => {
    dispatch(delteItem(id));
  };
}
export function clearCartAction() {
  return (dispatch) => {
    dispatch(clearCart());
  };
}
export function addItem(payload) {
  return {
    type: ADD_ITEM_TO_CART,
    payload,
  };
}

export function addQuntity(payload) {
  return {
    type: ADD_ITEM_QUANTITY,
    payload,
  };
}
export function removeQuntity(payload) {
  return {
    type: REMOVE_ITEM_QUANTITY,
    payload,
  };
}
export function delteItem(payload) {
  return {
    type: DELETE_ITEM,
    payload,
  };
}

export function clearCart(payload) {
  return {
    type: CLEAR_CART,
    payload,
  };
}
