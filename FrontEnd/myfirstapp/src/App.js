import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/js/bootstrap.min.js";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddPerson from "./components/Persons/AddPerson";
import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import Main from "./components/Pages/Main";
import PageNotFound from "./components/Pages/404";
import ContactUs from "./components/Pages/ContactUs";
import AboutUs from "./components/Pages/AboutUs";
import AddBook from "./components/Pages/AddBook";
import Book from "./components/Pages/Book";
import EditBook from "./components/Pages/EditBook";
import Review from "./components/Pages/Review";
import Profile from "./components/Pages/Profile";
import ShoppingCart from "./components/Pages/ShoppingCart";

import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecureRoute from "./securityUtils/SecureRoute";
import SecureAdminRoute from "./securityUtils/SecureAdminRoute";
import Admin from "./components/UserManagement/Admin";
import MyOrders from "./components/Pages/MyOrders";
import MySoldBook from "./components/Pages/MySoldBook";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken,
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div data-testid="app-element" className="App">
            <Header />
            <Switch>
              <Route exact path="/aboutus" component={AboutUs} />
              <Route exact path="/contactus" component={ContactUs} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />

              <SecureRoute exact path="/main" component={Main} />
              <SecureRoute exact path="/" component={Landing} />
              <SecureRoute exact path="/profile" component={Profile} />
              <SecureRoute exact path="/editbook" component={EditBook} />
              <SecureRoute exact path="/addbook" component={AddBook} />
              <SecureRoute exact path="/book" component={Book} />
              <SecureRoute exact path="/review" component={Review} />
              <SecureRoute exact path="/dashboard" component={Dashboard} />
              <SecureRoute exact path="/addPerson" component={AddPerson} />
              <SecureRoute exact path="/myorders" component={MyOrders} />
              <SecureRoute exact path="/mysoldbooks" component={MySoldBook} />
              <SecureRoute
                exact
                path="/shoppingcart"
                component={ShoppingCart}
              />

              <SecureAdminRoute exact path="/admin" component={Admin} />

              <Route path="*">
                <PageNotFound />
              </Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
