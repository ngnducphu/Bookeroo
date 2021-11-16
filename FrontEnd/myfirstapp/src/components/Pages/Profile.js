import React, { useState, useEffect } from "react";

import "./Profile.css";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import EdiText from "react-editext";
import { Button } from "react-bootstrap";
import { searchMyBook } from "../../actions/bookActions";
import { getPerson } from "../../actions/personActions";
import { logout } from "../../actions/securityActions";
import { connect } from "react-redux";
import { useHistory } from "react-router";

const Profile = ({
  searchMyBook,
  getPerson,
  person,
  bookState,
  id,
  logout,
}) => {
  const [showMyBookDialog, setshowMyBookDialog] = useState(false);

  const handleCloseMyBookDialog = () => setshowMyBookDialog(false);

  const onSave = (val) => {};

  const history = useHistory();

  useEffect(() => {
    getPerson(id);
    searchMyBook(id, history);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMyBookClicked = () => {
    setshowMyBookDialog(true);
    searchMyBook(id, history);
  };

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-9">
            <img
              alt=""
              className="rounded-circle mt-0"
              width="50px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            ></img>
            <span className="font-weight-bold">
              {person.givenName} {person.surname}
            </span>
            <span className="text-black-50">{person.username}</span>
            <span> </span>
          </div>
          <Button
            variant="primary"
            onClick={() => {
              history.push("/addbook");
            }}
          >
            {" "}
            Add Book
          </Button>
          <div className="sidenav">
            <br></br>
            <Button variant="primary" onClick={handleMyBookClicked}>
              My Books
            </Button>
            <div className="sidenav">
              <br></br>
              <Button
                variant="primary"
                onClick={() => {
                  history.push("/myorders");
                }}
              >
                {" "}
                Order History
              </Button>
            </div>
            <div className="sidenav">
              <br></br>
              <Button
                variant="primary"
                onClick={() => {
                  history.push("/mysoldbooks");
                }}
              >
                {" "}
                My Sold Books
              </Button>
            </div>
            <Modal
              show={showMyBookDialog}
              onHide={handleCloseMyBookDialog}
              size="lg"
              className="mymodal"
              scrollable={true}
              aria-labelledby="contained-modal-title-vcenter"
              centered
              animation={false}
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  My Books
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* display a list of my books of the current user */}
                {bookState.myBooks.map((book, index) => {
                  return (
                    <div key={index}>
                      <Link
                        to={{
                          pathname: "/editbook",
                          state: { bookID: book.id },
                        }}
                      >
                        {book.title}
                      </Link>
                    </div>
                  );
                })}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleCloseMyBookDialog}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <br></br>
            <Button
              variant="primary"
              onClick={() => {
                logout();
                window.location.reload();
              }}
            >
              Log out
            </Button>
          </div>
        </div>
        <div className="p-3 py-5">
          <h1>Edit Account Information</h1>
          <br></br>
          <h4>Account Information</h4>
          <hr></hr>

          <strong>Full Name: </strong>

          <EdiText
            showButtonsOnHover
            value={`${person.givenName} ${person.surname}`}
            type="text"
            onSave={onSave}
          />
          <br></br>

          <strong>Email: </strong>

          <EdiText
            showButtonsOnHover
            value={person.username}
            type="text"
            onSave={onSave}
          />
          <br></br>

          <strong>Address Line: </strong>

          <EdiText
            showButtonsOnHover
            value={person.address}
            type="text"
            onSave={onSave}
          />
          <br></br>

          <strong>Phone Number: </strong>

          <EdiText
            showButtonsOnHover
            value={"0123456789"}
            type="text"
            onSave={onSave}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    bookState: state.bookState,
    person: state.person.person,
    id: state.security.user.id,
  };
};
export default connect(mapStateToProps, {
  searchMyBook,
  getPerson,
  logout,
})(Profile);

export const ProfilePlain = ({ person }) => {
  return (
    <div
      data-testid="root-container"
      class="container rounded bg-white mt-5 mb-5"
    >
      <div class="row">
        <div class="col-md-3 border-right">
          <div class="d-flex flex-column align-items-center text-center p-3 py-9">
            <img
              alt=""
              class="rounded-circle mt-0"
              width="50px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            ></img>
            <span class="font-weight-bold">
              {person.givenName} {person.surname}
            </span>
            <span class="text-black-50">{person.username}</span>
            <span> </span>
          </div>
          <Button variant="primary"> Add Book</Button>
          <div class="sidenav">
            <br></br>
            <Button variant="primary">My Books</Button>
            <Modal
              size="lg"
              className="mymodal"
              scrollable={true}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  My Books
                </Modal.Title>
              </Modal.Header>
              <Modal.Body></Modal.Body>
              <Modal.Footer>
                <Button variant="primary">Close</Button>
              </Modal.Footer>
            </Modal>

            <br></br>

            <br></br>
            <Button variant="primary">Log out</Button>
          </div>
        </div>
        <div class="p-3 py-5">
          <h1>Edit Account Information</h1>
          <br></br>
          <h4>Account Information</h4>
          <hr></hr>

          <strong data-testid="fullname">Full Name: </strong>

          <EdiText
            showButtonsOnHover
            value={`${person.givenName} ${person.surname}`}
            type="text"
          />
          <br></br>

          <strong data-testid="email">Email: </strong>

          <EdiText showButtonsOnHover value={person.username} type="text" />
          <br></br>

          <strong data-testid="address">Address Line: </strong>

          <EdiText showButtonsOnHover value={person.address} type="text" />
          <br></br>

          <strong data-testid="phoneNumber">Phone Number: </strong>

          <EdiText showButtonsOnHover value={"0123456789"} type="text" />
        </div>
      </div>
    </div>
  );
};
