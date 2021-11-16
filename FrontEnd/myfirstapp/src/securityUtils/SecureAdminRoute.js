import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const SecureAdminRoute = ({
  component: Component,
  security,
  ...otherProps
}) => (
  <Route
    {...otherProps}
    render={(props) =>
      security.validToken === true && security.user.role === "ROLE_ADMIN" ? (
        <Component {...props} />
      ) : (
        <Redirect to="/profile" />
      )
    }
  />
);

SecureAdminRoute.propTypes = {
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps)(SecureAdminRoute);
