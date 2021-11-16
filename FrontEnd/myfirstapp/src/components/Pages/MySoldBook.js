import React, { useEffect, useState } from "react";
import "./ShoppingCart.css";
import axios from "axios";
import { connect } from "react-redux";

const MySoldBook = (props) => {
  const [soldBooks, setSoldBooks] = useState([]);

  useEffect(() => {
    (async function getSoldBooks() {
      const res = await axios.get(
        ` http://13.237.200.50:8070/api/transactions/sellerId=${props.id}`,
        {
          timeout: 1000,
        }
      );
      setSoldBooks(res.data);
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="row">
      <div className="container">
        <div className="column">
          <h3>My Sold Book</h3>
          <hr></hr>
          {soldBooks.map((book) => {
            return (
              <div
                style={{
                  outline: "2px solid black",
                  backgroundColor: "#F0F0F0",
                  width: "auto",
                  overflow: "auto",
                  display: "block",
                  marginTop: "5%",
                }}
              >
                <h5>
                  &nbsp;&nbsp;Status:{" "}
                  <h5 style={{ display: "inline", color: "green" }}>
                    Delivered
                  </h5>
                </h5>
                <hr></hr>

                <p style={{ padding: "5%" }}>
                  <img
                    className="resize"
                    src={book.bookImageUrl}
                    alt="Sunflower"
                  ></img>
                  <h4>{book.bookTitle}</h4>
                  <p>Format: Paperback</p>
                  <p>Author: {book.bookAuthor}</p>
                  <p>Available: Yes</p>
                  <label for="quantity">Quantity: 1 </label>
                  <p style={{ color: "red" }}>$ {book.price}</p>
                  <p style={{ textalign: "left" }}>
                    <div className="mb-2"></div>
                  </p>
                </p>
              </div>
            );
          })}

          <br></br>
          <div
            style={{
              outline: "2px solid black",
              backgroundColor: "#F0F0F0",
              width: "auto",
              height: "80px",
            }}
          >
            <br></br>

            <p style={{ textAlign: "center" }}>
              Displaying {soldBooks.length} sold books
            </p>
          </div>
          <br></br>
          <br></br>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    id: state.security.user.id,
  };
};
export default connect(mapStateToProps)(MySoldBook);
