import React from "react";
import "./ShoppingCart.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteCartItem, buyBooks } from "../../actions/cartActions";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router";
const ShoppingCart = (props) => {
  const history = useHistory();
  const handleRemove = (e) => {
    const answer = window.confirm(
      "Are you sure you want to delete this item from cart ? "
    );
    if (answer) {
      toast.error("Delete book from cart successfully");
      props.deleteCartItem(e.currentTarget.id);
    }
  };

  const computeTotalPrice = () => {
    let price = 0;
    for (const item of props.cart) {
      price += item.price;
    }

    return price;
  };

  const handleBuyBook = () => {
    // props cart is array of book
    props.buyBooks(props.cart, props.id, history);
  };
  return (
    <div className="row">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="container">
        <div className="column">
          <h3>Your Cart</h3>
          <hr></hr>
          <h5>Shopping cart details</h5>
          {props.cart.map((item, index) => {
            return (
              <div className="order-item" key={index}>
                {" "}
                <hr></hr>
                <img
                  className="resize"
                  src={item.coverImageUrl}
                  alt="Sunflower"
                ></img>
                <Link
                  className="nav-link"
                  style={{ color: "black", fontWeight: "bold" }}
                  to={{
                    pathname: "/book",
                    state: { bookID: `${item.id}` },
                  }}
                >
                  {item.title}
                </Link>
                <p>
                  Author:{" "}
                  {item.authors !== undefined ? item.authors[0].name : ""}
                </p>
                <p>Available: Yes</p>
                <p>Quantity: 1</p>
                <p style={{ color: "red" }}>$ {item.price}</p>
                <div style={{ textalign: "left" }}>
                  <div className="mb-2">
                    {/* <span style={{ float: "right" }}> */}
                    {/* hacky */}
                    <button
                      id={item.id}
                      className="btn btn-danger button-remove"
                      onClick={handleRemove}
                    >
                      Remove
                    </button>
                    {/* </span> */}
                  </div>
                </div>
                <br></br>
                <hr></hr>
              </div>
            );
          })}
          {props.cart.length === 0 ? (
            // Add styling here
            <div>No item added to cart</div>
          ) : (
            <div id="c2">
              <div style={{ display: "inline", padding: "140px" }}>
                Delivery
              </div>
              &nbsp;
              <div style={{ display: "inline" }}>FREE</div>
              <br></br>
              <hr></hr>
              <div style={{ display: "inline", padding: "140px" }}>
                <b>Total</b>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div style={{ display: "inline" }}>$ {computeTotalPrice()}</div>
              <br></br>
              <br></br>
              <div style={{ display: "inline", padding: "140px" }}>
                <Button
                  style={{ width: "60%", height: "50px", fontsize: "90px" }}
                  variant="primary"
                  size="sm"
                  onClick={handleBuyBook}
                >
                  <b>Buy</b>
                </Button>{" "}
              </div>
            </div>
          )}
          <p className="padd"></p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cartState.cart,
    id: state.security.user.id,
  };
};
export default connect(mapStateToProps, { deleteCartItem, buyBooks })(
  ShoppingCart
);

export const ShoppingCartPlain = (props) => {
  return (
    <div class="row">
      <ToastContainer position="top-center" autoClose={2000} />
      <div data-testid="container" class="container">
        <div class="column">
          <h3 data-testid="form-title">Your Cart</h3>
          <hr></hr>
          <h5>Shopping cart details</h5>
          return (
          <div>
            {" "}
            <hr></hr>
            <p>
              <img class="resize" alt="Sunflower"></img>
              <Link className="nav-link" style={{ color: "black" }}></Link>
              <p>Author: </p>
              <p>Available: Yes</p>
              <p>Quantity: 1</p>
              <p style={{ color: "red" }}>$</p>
              <p style={{ textalign: "left" }}>
                <div className="mb-2">
                  <span style={{ float: "right" }}>
                    {/* hacky */}
                    <button data-testid="remove-btn" class="button danger">
                      Remove
                    </button>
                  </span>
                </div>
              </p>
            </p>
            <br></br>
            <hr></hr>
          </div>
          ); ( // Add styling here
          <div>No item added to cart</div>) : (
          <div id="c2">
            <div style={{ display: "inline", padding: "140px" }}>Delivery</div>
            &nbsp;
            <div style={{ display: "inline" }}>FREE</div>
            <br></br>
            <hr></hr>
            <div style={{ display: "inline", padding: "140px" }}>
              <b>Total</b>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div style={{ display: "inline" }}>$</div>
            <br></br>
            <br></br>
            <div style={{ display: "inline", padding: "140px" }}>
              <Button
                data-testid="buy-btn"
                style={{ width: "60%", height: "50px", fontsize: "90px" }}
                variant="primary"
                size="sm"
              >
                <b>Buy</b>
              </Button>{" "}
            </div>
          </div>
          <p className="padd"></p>
        </div>
      </div>
    </div>
  );
};
