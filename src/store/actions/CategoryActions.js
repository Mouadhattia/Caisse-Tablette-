import { getCategory } from "../../services/CategoryService";

export const GET_ALL_GATEGORIES = "GET_ALL_GATEGORIES";

export function categoryAction() {
  return (dispatch) => {
    getCategory()
      .then((response) => {
        dispatch(getAllCategories(response.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
 
}

export function getAllCategories(payload) {
  return {
    type: GET_ALL_GATEGORIES,
    payload,
  };
}
