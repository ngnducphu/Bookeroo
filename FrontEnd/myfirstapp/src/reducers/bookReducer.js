import {
  DISPLAY_BOOKS,
  SEARCH_BOOKS,
  SEARCH_EDIT_BOOK,
  DELETE_BOOK,
  EDIT_BOOK_FE,
  SEARCH_VIEW_BOOK,
  SEARCH_MY_BOOKS,
} from "../actions/types";

const intialState = {
  books: [],
  viewBook: {},
  editBook: {},
  myBooks: [],
};

const booksReducer = (state = intialState, action) => {
  switch (action.type) {
    case SEARCH_BOOKS:
      return { ...state, books: action.payload };
    case DISPLAY_BOOKS:
      return { ...state, books: action.payload };
    case SEARCH_EDIT_BOOK:
      return { ...state, editBook: action.payload };
    case DELETE_BOOK:
      const newMyBook = [];
      for (const book of state.myBooks) {
        if (book.id !== action.payload.id) {
          newMyBook.push(book);
        }
      }
      return { ...state, myBooks: newMyBook };
    case EDIT_BOOK_FE:
      return { ...state, editBook: action.payload };
    case SEARCH_VIEW_BOOK:
      return { ...state, viewBook: action.payload };
    case SEARCH_MY_BOOKS:
      return { ...state, myBooks: action.payload };
    default:
  }
  return state;
};

export default booksReducer;
