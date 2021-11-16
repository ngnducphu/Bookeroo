import axios from "axios";
import {
  DISPLAY_BOOKS,
  SEARCH_BOOKS,
  SEARCH_EDIT_BOOK,
  EDIT_BOOK_FE,
  DELETE_BOOK,
  UPDATE_EDIT_BOOK,
  SEARCH_VIEW_BOOK,
  SEARCH_MY_BOOKS,
} from "./types";
import { bookEndpoint } from "./APIs";
import { toast } from "react-toastify";

export const searchBooks =
  (searchType, searchTerm, history) => async (dispatch) => {
    try {
      // http://localhost:8080/api/books/${searchType}/${searchTerm}
      searchType = searchType.toLowerCase();
      searchTerm = searchTerm.toLowerCase();

      const res = await axios.get(
        `${bookEndpoint}books/${searchType}=${searchTerm}`,
        {
          timeout: 1000,
        }
      );

      // //format data to put in the payload
      dispatch({
        type: SEARCH_BOOKS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SEARCH_BOOKS,
        payload: [],
      });
    }
  };

// action triggered when user logs in to main page, will display latest added books from APIs
export const displayBooks = () => async (dispatch) => {
  try {
    const res = await axios.get(`${bookEndpoint}books`, {
      timeout: 500,
    });

    dispatch({
      type: DISPLAY_BOOKS,
      payload: res.data,
    });
  } catch (err) {
    // history.push("/404");
  }
};

export const addBook = (bookAdd, history) => async (dispatch) => {
  // build the book object from the book form

  const jsonBookAdd = JSON.stringify(bookAdd);
  try {
    const res = await axios.post(`${bookEndpoint}books/add`, jsonBookAdd, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json",
      },
    });

    if (res.status === 201) {
      toast.success("Add Book Success");
    } else {
      toast.warn("Add Book Fail");
    }
  } catch (err) {
    // history.push("/404");
  }
};

// called when hitting the edit book card
export const searchEditBook = (bookId, history) => async (dispatch) => {
  try {
    // should be update request
    const res = await axios.get(`${bookEndpoint}books/id=${bookId}`, {
      timeout: 500,
    });
    dispatch({
      type: SEARCH_EDIT_BOOK,
      payload: res.data,
    });
  } catch (err) {
    // history.push("/404");
  }
};

export const editBookFrontEnd = (editBook) => async (dispatch) => {
  dispatch({
    type: EDIT_BOOK_FE,
    payload: editBook,
  });
};

// called when hitting to save button commit to backend
export const editBookBackend =
  (editBook, userID, history) => async (dispatch) => {
    try {
      const authorNamesEdit = [];
      for (const author of editBook.authors) {
        authorNamesEdit.push(author.name);
      }

      const categoryNamesEdit = [];
      for (const category of editBook.authors) {
        categoryNamesEdit.push(category.name);
      }
      const payload = {
        book: {
          userId: parseInt(userID),
          title: editBook.title,
          isbn10: "1234567891",
          isbn13: "",
          longDescription: editBook.longDescription,
          shortDescription: editBook.shortDescription,
          publishedDate: editBook.publishedDate,
          coverImageUrl: editBook.coverImageUrl,
          status: editBook.status,
          price: parseFloat(editBook.price),
          quantity: parseInt(editBook.quantity),
        },
        authorNames: authorNamesEdit,
        categoryNames: categoryNamesEdit,
        publisherName:
          editBook.publisher === null ? "Amazon" : editBook.publisher.name,
      };

      const bookID = editBook.id;
      const jsonBookEdit = JSON.stringify(payload);
      const endpoint = `${bookEndpoint}books/edit/${bookID}`;

      const res = await axios.put(endpoint, jsonBookEdit, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        toast.success("Edit Book Success");
      } else {
        toast.warn("Edit book failed");
      }
    } catch (err) {
      // history.push("/404");
    }
  };

// may only need bookid
export const deleteBook =
  (deletedBook, userId, history) => async (dispatch) => {
    try {
      const endpoint = `${bookEndpoint}books/remove/${deletedBook.id}`;
      const res = await axios.delete(endpoint);
      if (res.status === 200) {
        toast.success("Delete book success");

        // redirect to profile page
        setTimeout(() => {
          history.push("/profile");
        }, 3000);

        dispatch({
          type: DELETE_BOOK,
          payload: deletedBook,
        });
      } else {
        toast.warn("Delete Book Fail");
      }
    } catch (err) {
      // history.push("/404");
    }
  };

export const updateEditBook = (book) => async (dispatch) => {
  dispatch({
    type: UPDATE_EDIT_BOOK,
    payload: book,
  });
};

export const searchViewBook = (bookID, history) => async (dispatch) => {
  try {
    //`http://localhost:8080/api/books/id=${bookID}`
    const res = await axios.get(`${bookEndpoint}books/id=${bookID}`);
    dispatch({
      type: SEARCH_VIEW_BOOK,
      payload: res.data,
    });
  } catch (err) {
    // history.push("/404");
  }
};

export const searchMyBook = (userID, history) => async (dispatch) => {
  try {
    const res = await axios.get(`${bookEndpoint}books/UserId=${userID}`);

    dispatch({
      type: SEARCH_MY_BOOKS,
      payload: res.data,
    });
  } catch (err) {
    // history.push("/404");
  }
};
