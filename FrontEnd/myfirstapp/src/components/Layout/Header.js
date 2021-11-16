import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { searchBooks } from "../../actions/bookActions";
import { syncLocalStorage } from "../../actions/cartActions";
import { useHistory, useLocation } from "react-router";
import { Badge } from "reactstrap";
const Header = (props) => {
  const location = useLocation();

  useEffect(() => {
    props.syncLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const history = useHistory();
  const handleOptionSelect = (e) => {
    e.preventDefault();
    const searchTerm = e.currentTarget.text;
    props.searchBooks("category", searchTerm, history);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/main">
            Bookeroo
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/aboutus">
                  About us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contactus">
                  Contact us
                </Link>
              </li>
              {location.pathname === "/main" ? (
                <li className="nav-item">
                  <div className="dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      role="button"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="https://www.bookdepository.com/"
                      onClick={(e) => {
                        e.currentTarget.click();
                      }}
                    >
                      Category
                    </a>

                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <a
                        className="dropdown-item"
                        onClick={handleOptionSelect}
                        href="https://www.bookdepository.com/"
                      >
                        Science Fiction
                      </a>
                      <div className="dropdown-divider"></div>
                      <a
                        href="https://www.bookdepository.com/"
                        className="dropdown-item"
                        onClick={handleOptionSelect}
                      >
                        Novel
                      </a>

                      <div className="dropdown-divider"></div>
                      <a
                        href="https://www.bookdepository.com/"
                        className="dropdown-item"
                        onClick={handleOptionSelect}
                      >
                        Fantasy
                      </a>
                      <div className="dropdown-divider"></div>

                      <a
                        href="https://www.bookdepository.com/"
                        className="dropdown-item"
                        onClick={handleOptionSelect}
                      >
                        Thriller
                      </a>
                      <div className="dropdown-divider"></div>

                      <a
                        href="https://www.bookdepository.com/"
                        className="dropdown-item"
                        onClick={handleOptionSelect}
                      >
                        Romance
                      </a>
                    </div>
                  </div>
                </li>
              ) : (
                ""
              )}
            </ul>
            {props.security.validToken !== true ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link " to="/register">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link " to="/shoppingcart">
                    <i className="fa fa-shopping-cart ">
                      <Badge variant="info">{props.cart.length} </Badge>
                    </i>
                  </Link>
                </li>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <li className="nav-item">
                  <Link className="nav-link " to="/profile">
                    My Profile
                  </Link>
                </li>
                {props.security.user.role === "ROLE_ADMIN" ? (
                  <li className="nav-item">
                    <Link className="nav-link " to="/admin">
                      Admin
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => ({
  security: state.security,
  cart: state.cartState.cart,
});
export default connect(mapStateToProps, { searchBooks, syncLocalStorage })(
  Header
);

export const HeaderPlain = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/main">
            Bookeroo
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/aboutus">
                  About us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contactus">
                  Contact us
                </Link>
              </li>
              {"testing" === "/main" ? (
                <li className="nav-item">
                  <div className="dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      role="button"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="https://www.bookdepository.com/"
                      onClick={(e) => {
                        e.currentTarget.click();
                      }}
                    >
                      Category
                    </a>

                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <a
                        className="dropdown-item"
                        href="https://www.bookdepository.com/"
                      >
                        Science Fiction
                      </a>
                      <div className="dropdown-divider"></div>
                      <a
                        href="https://www.bookdepository.com/"
                        className="dropdown-item"
                      >
                        Novel
                      </a>

                      <div className="dropdown-divider"></div>
                      <a
                        href="https://www.bookdepository.com/"
                        className="dropdown-item"
                      >
                        Fantasy
                      </a>
                      <div className="dropdown-divider"></div>

                      <a
                        href="https://www.bookdepository.com/"
                        className="dropdown-item"
                      >
                        Thriller
                      </a>
                      <div className="dropdown-divider"></div>

                      <a
                        href="https://www.bookdepository.com/"
                        className="dropdown-item"
                      >
                        Romance
                      </a>
                    </div>
                  </div>
                </li>
              ) : (
                ""
              )}
            </ul>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link " to="/profile">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
