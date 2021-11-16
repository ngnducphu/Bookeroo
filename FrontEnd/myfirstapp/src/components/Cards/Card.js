import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addCartItem } from "../../actions/cartActions";
import ReadMore from "../Miscellaneous/ReadMore";
import { ToastContainer, toast } from "react-toastify";

const Card = (props) => {
  const handleAddToCart = () => {
    let exist = false;
    for (const item of props.cart) {
      if (item.id === props.bookProps.id) {
        exist = true;
      }
    }

    if (!exist) {
      toast.success("Book added successfully");

      props.addCartItem(props.bookProps);
    } else {
      toast.warn("This book has been added");
    }
  };
  return (
    <div data-testid="card-element" className="card">
      <ToastContainer position="top-center" autoClose={2000} />

      <div data-testid="card-body-element" className="card-body">
        <img
          data-testid="card-image-element"
          className="card-img-top card-image-container"
          src={props.bookProps.coverImageUrl}
          alt="Card cap"
        />
        <Link
          className="stretched-link link"
          to={{
            pathname: "/book",
            state: { bookID: props.bookProps.id },
          }}
        >
          <h5 data-testid="card-title-element" className="card-title">
            {props.bookProps.title}
          </h5>
        </Link>
        <p data-testid="card-paragraph-author-element" className="card-text">
          <small data-testid="card-author-element" className="text-muted">
            {/* single author for now multiple then need to use maps function every book is guaranteed to have at least one author*/}
            {props.bookProps.authors[0].name}
          </small>
        </p>

        <div data-testid="card-paragraph-short-description">
          <ReadMore>{props.bookProps.shortDescription}</ReadMore>
        </div>
        <p data-testid="card-paragraph-price" className="card-text-price">
          A$ {props.bookProps.price}
        </p>
      </div>
      <button
        data-testid="card-add-to-cart-element"
        className="btn btn-primary"
        onClick={handleAddToCart}
      >
        ADD TO CART
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cartState.cart,
});
export default connect(mapStateToProps, { addCartItem })(Card);

export const CardPlain = (props) => {
  return (
    <div data-testid="card-element" className="card">
      <div data-testid="card-body-element" className="card-body">
        <img
          data-testid="card-image-element"
          className="card-img-top card-image-container"
          src={props.bookProps.coverImageUrl}
          alt="Card cap"
        />
        <Link
          className="stretched-link link"
          to={{
            pathname: "/book",
            state: { bookID: props.bookProps.id },
          }}
        >
          <h5 data-testid="card-title-element" className="card-title">
            {props.bookProps.title}
          </h5>
        </Link>
        <p data-testid="card-paragraph-author-element" className="card-text">
          <small data-testid="card-author-element" className="text-muted">
            {/* single author for now multiple then need to use maps function every book is guaranteed to have at least one author*/}
            {props.bookProps.authors[0].name}
          </small>
        </p>

        <div data-testid="card-paragraph-short-description">
          <ReadMore>{props.bookProps.shortDescription}</ReadMore>
        </div>
        <p data-testid="card-paragraph-price" className="card-text-price">
          A$ {props.bookProps.price}
        </p>
      </div>
      <button
        data-testid="card-add-to-cart-element"
        className="btn btn-primary"
      >
        ADD TO CART
      </button>
    </div>
  );
};
