import { GET_ALL_TABLE } from "../actions/TableActions";

const initialState = {
  tables: [],
};

export function TableReducer(state = initialState, action) {
  if (action.type === GET_ALL_TABLE) {
    return {
      ...state,
      tables: action.payload,
    };
  }

  return state;
}
