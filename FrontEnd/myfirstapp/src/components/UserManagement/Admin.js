import React, { useEffect } from "react";
import AdminCard from "./AdminCard";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
  getPendingShopOwners,
  approveShopOwner,
} from "../../actions/personActions";

const Admin = ({
  pendingShopOwners,
  approveShopOwner,
  getPendingShopOwners,
}) => {
  useEffect(() => {
    getPendingShopOwners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <ToastContainer position="top-center" autoClose={2000} />
      {pendingShopOwners.length === 0 ? (
        <div style={{ paddingLeft: "5%", paddingTop: "2%" }}>
          <h1>No Pending Shop Owners</h1>
        </div>
      ) : (
        pendingShopOwners.map((pendingShopOwner, index) => {
          return (
            <div key={index}>
              <AdminCard
                shopOwner={pendingShopOwner}
                approveShopOwner={approveShopOwner}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    pendingShopOwners: state.person.pendingShopOwners,
  };
};
export default connect(mapStateToProps, {
  getPendingShopOwners,
  approveShopOwner,
})(Admin);
