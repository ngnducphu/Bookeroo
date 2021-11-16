import {
  DISPLAY_CART_ITEMS,
  DELETE_CART_ITEM,
  ADD_CART_ITEM,
} from "../actions/types";

const intialState = {
  cart: [],
};

const cartReducer = (state = intialState, action) => {
  switch (action.type) {
    case DISPLAY_CART_ITEMS:
      return { cart: action.payload };
    case DELETE_CART_ITEM:
      const newCartDelete = [];
      for (const item of state.cart) {
        if (item.id.toString() !== action.payload.toString()) {
          newCartDelete.push(item);
        }
      }

      localStorage.setItem("cart", JSON.stringify(newCartDelete));
      return { cart: newCartDelete };
    case ADD_CART_ITEM:
      const newCartAdd = [...state.cart];
      newCartAdd.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(newCartAdd));
      return { cart: newCartAdd };
    default:
  }
  return state;
};

export default cartReducer;
