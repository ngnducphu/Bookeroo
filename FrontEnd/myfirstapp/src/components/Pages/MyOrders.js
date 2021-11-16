import React, { useEffect, useState } from "react";
import "./ShoppingCart.css";
import axios from "axios";
import { connect } from "react-redux";

const MyOrders = (props) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    (async function getOrderHistory() {
      const res = await axios.get(
        ` http://13.237.200.50:8070/api/transactions/userId=${props.id}
      `,
        {
          timeout: 1000,
        }
      );

      setOrders(res.data);
    })();
    // eslint-disable-next-line
  }, []);

  const totalPrice = (order) => {
    let priceRes = 0;
    for (const item of order) {
      priceRes += item.price;
    }

    return priceRes;
  };
  return (
    <div className="row">
      <div className="container">
        <div className="column">
          <h3>My Orders</h3>
          <hr></hr>
          {orders.map((order) => {
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
                {order.map((orderLine) => {
                  return (
                    <div>
                      <p style={{ padding: "5%" }}>
                        <img
                          className="resize"
                          src={orderLine.bookImageUrl}
                          alt="Sunflower"
                        ></img>
                        <h4>{orderLine.bookTitle}</h4>
                        <p>Format: Paperback</p>
                        <p>Author: {orderLine.bookAuthor}</p>
                        <p>Available: Yes</p>
                        <label for="quantity">Quantity: 1 </label>
                        <p style={{ color: "red" }}>$ {orderLine.price}</p>
                        <p style={{ textalign: "left" }}>
                          <div className="mb-2"></div>
                        </p>
                      </p>
                      <br></br>
                      <hr></hr>
                    </div>
                  );
                })}

                <div id="c2" style={{ padding: "10px" }}>
                  <div style={{ display: "inline", padding: "130px" }}>
                    <b>Quanity:</b>
                  </div>
                  <div style={{ display: "inline" }}>2</div>
                  <br></br>
                  <div style={{ display: "inline", padding: "130px" }}>
                    <b>Delivery</b>
                  </div>
                  <div style={{ display: "inline" }}>FREE</div>
                  <br></br>
                  <div style={{ display: "inline", padding: "130px" }}>
                    <b>Total</b>
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <div style={{ display: "inline" }}>$ {totalPrice(order)}</div>
                  <br></br>
                  <br></br>
                </div>
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
              Displaying {orders.length} orders
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
export default connect(mapStateToProps)(MyOrders);
