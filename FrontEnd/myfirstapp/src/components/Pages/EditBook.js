import React, { useEffect } from "react";
import "./EditBook.css";
import EdiText from "react-editext";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  searchEditBook,
  editBookFrontEnd,
  editBookBackend,
  deleteBook,
} from "../../actions/bookActions";
import { useHistory } from "react-router";
const EditBook = (props) => {
  const history = useHistory();

  useEffect(() => {
    props.searchEditBook(props.location.state.bookID, history);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteBook = () => {
    const answer = window.confirm(
      "Are you sure you want to delete books ? This action is irreversible"
    );

    if (answer) {
      props.deleteBook(props.bookState.editBook, props.id, history);
      // history.push("/profile");
    } else {
    }
  };

  const handleEditBook = () => {
    props.editBookBackend(props.bookState.editBook, props.id, history);
  };

  return (
    <React.Fragment>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="container">
        <div className="row">
          <div className="col">
            <img
              className="rresize"
              src={props.bookState.editBook.coverImageUrl}
              alt="Sunflower"
            ></img>
          </div>{" "}
          <div className="col">
            <h3 style={{ textalign: "left" }}>
              <EdiText
                value={props.bookState.editBook.title}
                type="url"
                onSave={(value) => {
                  props.editBookFrontEnd({
                    ...props.bookState.editBook,
                    title: value,
                  });
                }}
                inline
                readonly
              />
              <span style={{ float: "right" }}></span>
            </h3>
            <strong>By </strong>
            <EdiText
              value={
                props.bookState.editBook.authors === undefined
                  ? ""
                  : props.bookState.editBook.authors[0].name
              }
              type="url"
              onSave={(value) => {
                const authorNames = [];
                authorNames.push(value);
                const newEditBook = { ...props.bookState.editBook };
                newEditBook.authors[0].name = authorNames[0];
                props.editBookFrontEnd(newEditBook);
              }}
              inline
              readonly
            />

            <Link className="nav-link" to="/review">
              {" "}
              Write a Review
            </Link>
            <hr></hr>
            <strong>Status: </strong>
            <EdiText
              value={props.bookState.editBook.status}
              type="text"
              onSave={(value) => {
                props.editBookFrontEnd({
                  ...props.bookState.editBook,
                  status: value,
                });
              }} //   inline readonly
            />
            <strong>Price: </strong>
            <EdiText
              value={`$ ${props.bookState.editBook.price}`}
              type="text"
              onSave={(value) => {
                props.editBookFrontEnd({
                  ...props.bookState.editBook,
                  price: value,
                });
              }}
              inline
              readonly
            />
            <h3>Short Description</h3>
            <EdiText
              type="textarea"
              inputProps={{
                className: "textarea",
                placeholder: "Type your Short Description",
                style: {
                  outline: "none",
                  minWidth: "500px",
                },
                rows: 5,
              }}
              value={props.bookState.editBook.shortDescription}
              onSave={(value) => {
                alert(value);
                props.editBookFrontEnd({
                  ...props.bookState.editBook,
                  shortDescription: value,
                });
              }}
            />
            <hr></hr>
            <div className="row">
              <div className="col">
                <h3>Long Description </h3>
                <EdiText
                  type="textarea"
                  inputProps={{
                    className: "textarea",
                    placeholder: "Type your Short Description",
                    style: {
                      outline: "none",
                      minWidth: "1000px",
                    },
                    rows: 10,
                  }}
                  value={props.bookState.editBook.longDescription}
                  onSave={(value) => {
                    props.editBookFrontEnd({
                      ...props.bookState.editBook,
                      longDescription: value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h3>Publisher </h3>
                <EdiText
                  type="textarea"
                  inputProps={{
                    className: "textarea",
                    placeholder: "Type your Publisher ",
                    style: {
                      outline: "none",
                      minWidth: "1000px",
                    },
                    rows: 10,
                  }}
                  value={
                    props.bookState.editBook.publisher === undefined ||
                    props.bookState.editBook.publisher === null
                      ? "No publisher"
                      : props.bookState.editBook.publisher.name
                  }
                  onSave={(value) => {
                    props.editBookFrontEnd({
                      ...props.bookState.editBook,
                      publisher: value,
                    });
                  }}
                />
              </div>
            </div>

            <div className="button-group">
              <button
                type="addbook"
                className="btn btn-primary"
                onClick={handleEditBook}
              >
                Save
              </button>
              <span className="space"></span>
              <button
                type="addbook"
                className="btn btn-danger"
                onClick={handleDeleteBook}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    bookState: state.bookState,
    id: state.security.user.id,
  };
};
export default connect(mapStateToProps, {
  searchEditBook,
  editBookFrontEnd,
  editBookBackend,
  deleteBook,
})(EditBook);

/* Plain component for testing purpose */
export const EditBookPlain = (props) => {
  return (
    <React.Fragment>
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="row">
        <div className="container">
          <div className="column">
            <p>
              <img
                className="rresize"
                src="https://www.baka-tsuki.org/project/images/9/9d/Sword_Art_Online_Progressive_Vol_1_-_001.jpg"
                alt="Sunflower"
              ></img>
              <p style={{ textalign: "left" }}>
                <EdiText
                  value={props.bookState.editBook.title}
                  type="url"
                  inline
                  readonly
                />
                <span style={{ float: "right" }}></span>
              </p>
            </p>
            <strong>By </strong>
            <EdiText
              value={
                props.bookState.editBook.authors === undefined
                  ? ""
                  : props.bookState.editBook.authors[0].name
              }
              type="url"
              inline
              readonly
            />

            <Link className="nav-link" to="/review">
              {" "}
              Write a Review
            </Link>
            <hr></hr>
            <strong>Status: </strong>
            <EdiText value={props.bookState.editBook.status} type="text" />
            <strong>Price: </strong>
            <EdiText
              value={`$ ${props.bookState.editBook.price}`}
              type="text"
              inline
              readonly
            />
            <h3 data-testid="short-description">Short Description</h3>
            <EdiText
              type="textarea"
              inputProps={{
                className: "textarea",
                placeholder: "Type your Short Description",
                style: {
                  outline: "none",
                  minWidth: "500px",
                },
                rows: 5,
              }}
              value={props.bookState.editBook.shortDescription}
            />
            <hr></hr>
            <div className="row">
              <div className="column">
                <h3 data-testid="long-description">Long Description </h3>
                <EdiText
                  type="textarea"
                  inputProps={{
                    className: "textarea",
                    placeholder: "Type your Short Description",
                    style: {
                      outline: "none",
                      minWidth: "1000px",
                    },
                    rows: 10,
                  }}
                  value={props.bookState.editBook.longDescription}
                />
              </div>
            </div>
            <hr></hr>
          </div>
          <p style={{ textalign: "left" }}>
            <span>
              <button
                data-testid="save-btn"
                type="addbook"
                className="btn btn-primary"
              >
                Save
              </button>
              <span className="space"></span>
              <button
                data-testid="delete-btn"
                type="addbook"
                class="btn btn-danger"
              >
                Delete
              </button>
            </span>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};
