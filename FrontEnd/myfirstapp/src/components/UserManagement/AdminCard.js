import React from "react";
import "./AdminCard.css";

const AdminCard = ({ shopOwner, approveShopOwner }) => {
  const handleApprove = () => {
    approveShopOwner(shopOwner.id);
  };

  return (
    <div className="card shopowner-card">
      <h5 className="card-header">
        Shop Owner Name: {shopOwner.givenName} {shopOwner.surname}
      </h5>
      <div className="card-body">
        <h5 className="card-title">Details</h5>
        <p className="card-text">
          <b>Email Address:</b> {shopOwner.username}
        </p>
        <p className="card-text">
          <b>ABN: </b>
          {shopOwner.abn}
        </p>
        <p className="card-text">
          <b>Address: </b> {shopOwner.address}
        </p>
        <p className="card-text">
          {" "}
          <b>Phone Number:</b> {shopOwner.phoneNumber}
        </p>
        <button className="btn btn-primary approve-btn" onClick={handleApprove}>
          Approve
        </button>
        <button className="btn btn-danger reject-btn">Reject</button>
      </div>
    </div>
  );
};

export default AdminCard;
