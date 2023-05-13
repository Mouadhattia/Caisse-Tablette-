import { getTable } from "../../services/TableService";

export const GET_ALL_TABLE = "GET_ALL_TABLE";

export function tableAction() {
  return (dispatch) => {
    getTable()
      .then((response) => {
        dispatch(getAllTable(response.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getAllTable(payload) {
  return {
    type: GET_ALL_TABLE,
    payload,
  };
}
