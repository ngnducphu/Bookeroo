import React, { useEffect } from "react";
import "./Book.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { searchViewBook } from "../../actions/bookActions";
import { addCartItem } from "../../actions/cartActions";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";

const Book = ({ bookState, searchViewBook, addCartItem, location, cart }) => {
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    searchViewBook(location.state.bookID, history);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddToCart = () => {
    let exist = false;
    for (const item of cart) {
      if (item.id === bookState.viewBook.id) {
        exist = true;
      }
    }

    if (!exist) {
      toast.success("Book added successfully");

      addCartItem(bookState.viewBook);
    } else {
      toast.warn("This book has been added");
    }
  };
  return (
    <div className="container">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="row">
        <div className="col">
          {/* to be replacecd with imageCoverUrl */}
          <div className="row">
            {" "}
            <img
              className="rresize"
              src={bookState.viewBook.coverImageUrl}
              alt="Sunflower"
            ></img>
          </div>
          <div className="row">
            {" "}
            <button
              onClick={handleAddToCart}
              className="btn btn-success btn-add-to-cart"
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className="col">
          <h2>{bookState.viewBook.title}</h2>
          by{" "}
          {bookState.viewBook.authors === undefined
            ? ""
            : bookState.viewBook.authors[0].name}
          <Link className="nav-link" to="/review">
            Write a Review
          </Link>
          <hr></hr>
          <p style={{ textalign: "left" }}>
            <b>Price: $ {bookState.viewBook.price}</b>
            <span style={{ float: "right" }}>
              Status: <font color="green">{bookState.viewBook.status}</font>
            </span>
          </p>
          <hr></hr>
          <h3>Short Description</h3>
          <p>{bookState.viewBook.shortDescription}</p>
          <hr></hr>
          <h3>Long Description</h3>
          <p>{bookState.viewBook.longDescription}</p>
          <hr></hr>
          <h3>Product Details</h3>
          <p>
            Publisher:
            {bookState.viewBook.publisher === undefined ||
            bookState.viewBook.publisher == null
              ? ""
              : bookState.viewBook.publisher.name}
          </p>
          <p>ISBN10: {bookState.viewBook.isbn10}</p>
          <p>ISBN13: {bookState.viewBook.isbn13}</p>
          <p>Release Date: October 10, 2012</p>
          <hr></hr>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    bookState: state.bookState,
    cart: state.cartState.cart,
  };
};
export default connect(mapStateToProps, {
  searchViewBook,
  addCartItem,
})(Book);

export const BookPlain = ({ bookState }) => {
  return (
    <div data-testid="container" className="container">
      <div data-testid="row" className="row">
        <div data-testid="col" className="col">
          {/* to be replacecd with imageCoverUrl */}
          <img
            className="rresize"
            src={bookState.viewBook.coverImageUrl}
            alt="Sunflower"
          ></img>
        </div>
        <div className="col">
          <h2 data-testid="book-title">{bookState.viewBook.title}</h2>
          by{" "}
          {bookState.viewBook.authors === undefined
            ? ""
            : bookState.viewBook.authors[0].name}
          <hr></hr>
          <p style={{ textalign: "left" }}>
            <b data-testid="price">Price: $ {bookState.viewBook.price}</b>
            <span style={{ float: "right" }}>
              Status: <font color="green">{bookState.viewBook.status}</font>
            </span>
          </p>
          <hr></hr>
          <h3>Short Description</h3>
          <p>{bookState.viewBook.shortDescription}</p>
          <hr></hr>
          <h3>Long Description</h3>
          <p>{bookState.viewBook.longDescription}</p>
          <hr></hr>
          <h3>Product Details</h3>
          <p>
            Publisher:
            {bookState.viewBook.publisher === undefined ||
            bookState.viewBook.publisher == null
              ? ""
              : bookState.viewBook.publisher.name}
          </p>
          <p>ISBN10: {bookState.viewBook.isbn10}</p>
          <p>ISBN13: {bookState.viewBook.isbn13}</p>
          <p>Release Date: October 10, 2012</p>
          <hr></hr>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};
