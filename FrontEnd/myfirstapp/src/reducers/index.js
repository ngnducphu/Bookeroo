import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import personReducer from "./personReducer";
import securityReducer from "./securityReducer";
import booksReducer from "./bookReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
  errors: errorReducer,
  person: personReducer,
  security: securityReducer,
  bookState: booksReducer,
  cartState: cartReducer,
});
