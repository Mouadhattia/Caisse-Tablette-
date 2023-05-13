import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import PostsReducer from "./reducers/PostsReducer";
import { AuthReducer } from "./reducers/AuthReducer";
import todoReducers from "./reducers/Reducers";
import { CategoryReducer } from "./reducers/CategoryReducer";
import { ProductReducer } from "./reducers/ProductReducer";
import { CartReducer } from "./reducers/CartReducer";
import { TableReducer } from "./reducers/TableReducer";

const middleware = applyMiddleware(thunk);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  posts: PostsReducer,
  auth: AuthReducer,
  todoReducers,
  categories: CategoryReducer,
  products: ProductReducer,
  cart: CartReducer,
  tables: TableReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, composeEnhancers(middleware));
const persistor = persistStore(store);

export { store, persistor };
