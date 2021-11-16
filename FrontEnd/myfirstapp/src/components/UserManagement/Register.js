import React, { Component } from "react";
import { createNewUser } from "../../actions/securityActions";
import * as PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";

import { connect } from "react-redux";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      firstname: "",
      lastname: "",
      address: "",
      phoneNumber: "",
      usertype: "public",
      abnnumber: "",
      imageUrl: "",
    };
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  // new user state object

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      givenName: this.state.firstname,
      surname: this.state.lastname,
      address: this.state.address,
      phonenumber: this.state.phonenumber,
      roleCode: "",
      abn: this.state.abnnumber,
    };
    if (this.state.usertype === "shop owner") {
      newUser.roleCode = "SHOP";
    } else if (this.state.usertype === "admin") {
      newUser.roleCode = "ADMIN";
    } else if (this.state.usertype === "public") {
      newUser.roleCode = "PUBLIC";
    }
    this.props.createNewUser(newUser, this.props.history);
  }
  /*  on clicking submit a neUser object is created from details entered
     and the createNewUser in securityAction is called passing the neUser and history as a parameter */

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ abnnumber: "" });
  }

  render() {
    return (
      <div className="register">
        <div className="container">
          <ToastContainer position="top-center" autoClose={2000} />

          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="First Name"
                    name="firstname"
                    value={this.state.firstname}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Last Name"
                    name="lastname"
                    value={this.state.lastname}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Address"
                    name="address"
                    value={this.state.address}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Phone number"
                    name="phoneNumber"
                    value={this.state.phonenumber}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    defaultValue={this.state.selectValue}
                    onChange={this.handleChange}
                    name="usertype"
                    className="form-control form-control-lg"
                  >
                    <option value="public">Public User</option>
                    <option value="shop owner">Shop owner</option>
                  </select>
                </div>

                {this.state.usertype === "shop owner" && (
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="ABN Number"
                      name="abnnumber"
                      value={this.state.abnnumber}
                      onChange={this.onChange}
                    />
                  </div>
                )}

                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* prop validator to ensure warnings are shown whenever prop is not provided */
Register.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});
export default connect(mapStateToProps, { createNewUser })(Register);

export const RegisterPlain = (props) => {
  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your Account</p>
            <form onSubmit={props.onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Username"
                  name="username"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="First Name"
                  name="firstname"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Last Name"
                  name="lastname"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Address"
                  name="address"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Phone number"
                  name="phoneNumber"
                />
              </div>
              <div className="form-group">
                <select
                  name="usertype"
                  className="form-control form-control-lg"
                >
                  <option value="public">Public User</option>
                  <option value="shop owner">Shop owner</option>
                </select>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="ABN Number"
                  name="abnnumber"
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  name="password"
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                />
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
