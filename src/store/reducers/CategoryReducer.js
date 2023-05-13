import { GET_ALL_GATEGORIES } from "../actions/CategoryActions";

const initialState = {
  categories: [],
};

export function CategoryReducer(state = initialState, action) {
  if (action.type === GET_ALL_GATEGORIES) {
   ;
    return {
      ...state,
      categories: action.payload,
    };
  }

  return state;
}
