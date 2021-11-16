import { DISPLAY_CART_ITEMS, DELETE_CART_ITEM, ADD_CART_ITEM } from "./types";
import axios from "axios";
import { toast } from "react-toastify";

export const syncLocalStorage = () => async (dispatch) => {
  try {
    // synching localstorage and react state
    const cart =
      localStorage.getItem("cart") !== null
        ? JSON.parse(localStorage.getItem("cart"))
        : [];

    dispatch({
      type: DISPLAY_CART_ITEMS,
      payload: cart,
    });
  } catch (error) {}
};

export const deleteCartItem = (id) => async (dispatch) => {
  // pure frontend update
  dispatch({
    type: DELETE_CART_ITEM,
    payload: id,
  });
};

export const addCartItem = (book) => async (dispatch) => {
  dispatch({
    type: ADD_CART_ITEM,
    payload: book,
  });
};

// array of books buy, may be include user id ?
export const buyBooks =
  (booksPurchase, userID, history) => async (dispatch) => {
    try {
      console.log(booksPurchase);
      const orderLineItems = [];
      let count = 1;
      for (const book of booksPurchase) {
        orderLineItems.push({
          order_line_item_no: count,
          sellerId: book.userId,
          bookId: book.id,
          quantity: 1,
          price: book.price,
        });
        ++count;
      }

      const payload = {
        userId: parseInt(userID),
        orderLineItems: orderLineItems,
      };
      const jsonBooksPurchase = JSON.stringify(payload);
      console.log(jsonBooksPurchase);

      // http://localhost:8070/api/transactions/add
      const res = await axios.post(
        `http://13.237.200.50:8070/api/transactions/add`,
        jsonBooksPurchase,
        {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 201) {
        localStorage.setItem("cart", JSON.stringify([]));
        toast.success("Buy book success.");

        setTimeout(() => {
          window.location.reload();
        }, 2500);
      }
    } catch (error) {}
  };
