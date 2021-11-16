import React, { useState } from "react";
import "./AddBook.css";
import { addBook } from "../../actions/bookActions";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBook = (props) => {
  const [bookAdd, setBookAdd] = useState({
    book: {
      userId: "",
      title: "",
      isbn10: "",
      isbn13: "",
      longDescription: "",
      shortDescription: "",
      publishedDate: "",
      coverImageUrl: "",
      status: "USED",
      price: 0,
      quantity: 0,
    },
    authorNames: [""],
    categoryNames: ["Science Fiction"],
    publisherName: "",
  });
  // book state object

  const history = useHistory();
  const handleAddBook = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);

    console.log(props.person);
    const userID = parseInt(props.id);
    const newBookAdd = { ...bookAdd };

    newBookAdd.book.userId = userID;
    setBookAdd(newBookAdd);

    props.addBook(bookAdd, history);
  };
  return (
    <div className="row">
      <div data-testid="container" className="container">
        <ToastContainer position="top-center" autoClose={2000} />

        <div className="column">
          <h1 data-testid="title">Sell A Book Form</h1>
          <h5 data-testid="form-description">
            Please fill in the form below with the details of the book you want
            to sell. Thank you for choosing our platform to sell your book!
          </h5>
          <hr></hr>
          <br></br>
          <form>
            <div className="form-group">
              <i className="fas fa-book-open"> &nbsp;&nbsp;</i>
              <label data-testid="book-title" htmlFor="Book Title">
                {" "}
                Book Title
              </label>
              <input
                type="text"
                className="form-control"
                id="Book Title"
                aria-describedby="Book Title"
                placeholder="Enter Book Title"
                onChange={(e) => {
                  const newBookAdd = { ...bookAdd };
                  newBookAdd.book.title = e.target.value;
                  // assigning the value entered by the user as the title of the new book
                  setBookAdd(newBookAdd);
                }}
              />
            </div>
            <div className="form-group">
              <i className="fas fa-user"></i> &nbsp;&nbsp;{" "}
              <label htmlFor="author">Author</label>
              <input
                type="text"
                className="form-control"
                id="Author"
                aria-describedby="Author"
                placeholder="Enter Author Name"
                onChange={(e) => {
                  const newBookAdd = { ...bookAdd };
                  const newAuthorNames = [];
                  newAuthorNames.push(e.target.value);
                  newBookAdd.authorNames = newAuthorNames;
                  setBookAdd(newBookAdd);
                }}
              />
            </div>
            <div className="form-group">
              <i className="fa fa-list-alt" aria-hidden="true"></i>&nbsp;&nbsp;
              <label htmlFor="category">Category</label>
              <select
                name="categorytype"
                className="form-control form-control-md"
                value={bookAdd.categoryNames[0]}
                onChange={(e) => {
                  const newCategory = [];
                  newCategory.push(e.target.value);
                  const newBookAdd = { ...bookAdd };
                  newBookAdd.categoryNames = newCategory;
                  setBookAdd(newBookAdd);
                }}
              >
                <option defaultValue value="Science Fiction">
                  {" "}
                  Science Fiction
                </option>
                <option value="Novel">Novel</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Thriller">Thriller</option>
                <option value="Romance">Romance</option>
              </select>
            </div>
            <div className="form-group">
              <i className="fas fa-info-circle"></i> &nbsp;&nbsp;{" "}
              <label htmlFor="status">Status (Published or Not)</label>
              <select
                className="form-control form-control-md"
                onChange={(e) => {
                  const newBookAdd = { ...bookAdd };
                  newBookAdd.book.status = e.target.value;
                  setBookAdd(newBookAdd);
                }}
              >
                {" "}
                <option defaultValue value="USED">
                  {" "}
                  Used
                </option>
                <option value="NEW">New</option>
              </select>
            </div>
            <div className="form-group">
              <i className="fas fa-dollar-sign"></i> &nbsp;&nbsp;{" "}
              <label htmlFor="price">Price</label>
              <input
                type="text"
                className="form-control"
                id="price"
                aria-describedby="price"
                placeholder="Enter Price"
                onChange={(e) => {
                  const newBookAdd = { ...bookAdd };
                  newBookAdd.book.price = parseFloat(e.target.value);
                  setBookAdd(newBookAdd);
                }}
              />
            </div>
            <div className="form-group">
              <i className="fas fa-info-circle"></i> &nbsp;&nbsp;{" "}
              <label htmlFor="quantity">Quantity</label>
              <input
                type="text"
                className="form-control"
                id="quantity"
                aria-describedby="quantity"
                placeholder="Enter Quantity"
                onChange={(e) => {
                  const newBookAdd = { ...bookAdd };
                  newBookAdd.book.quantity = parseInt(e.target.value);
                  setBookAdd(newBookAdd);
                }}
              />
            </div>
            <div className="form-group">
              <i className="fas fa-info-circle"></i> &nbsp;&nbsp;{" "}
              <label htmlFor="quantity">Publisher</label>
              <input
                type="text"
                className="form-control"
                id="publisher-name"
                aria-describedby="publisher-name"
                placeholder="Enter Publisher"
                onChange={(e) => {
                  const newBookAdd = { ...bookAdd };
                  newBookAdd.publisherName = e.target.value;
                  setBookAdd(newBookAdd);
                }}
              />
            </div>
            <div className="form-group">
              <i className="fas fa-bars"></i> &nbsp;&nbsp;{" "}
              <label htmlFor="long description">Long Description</label>
              <textarea
                className="form-control"
                id="long description"
                aria-describedby="long description"
                placeholder="Enter a long description"
                onChange={(e) => {
                  const newBookAdd = { ...bookAdd };
                  newBookAdd.book.longDescription = e.target.value;
                  setBookAdd(newBookAdd);
                }}
              ></textarea>
            </div>
            <div className="form-group">
              <i className="fas fa-bars"></i> &nbsp;&nbsp;{" "}
              <label htmlFor="short description">Short Description</label>
              <textarea
                className="form-control"
                id="short description"
                aria-describedby="short description"
                placeholder="Enter a short description"
                onChange={(e) => {
                  const newBookAdd = { ...bookAdd };
                  newBookAdd.book.shortDescription = e.target.value;
                  setBookAdd(newBookAdd);
                }}
              ></textarea>
            </div>
            <div className="form-group">
              &nbsp;&nbsp; <i className="fas fa-barcode"></i> &nbsp;&nbsp;{" "}
              <label htmlFor="info">ISBN 10</label>
              <input
                type="text"
                className="form-control"
                id="ISBN-10"
                aria-describedby="ISBN"
                placeholder="Enter ISBN 10"
                onChange={(e) => {
                  const newBookAdd = { ...bookAdd };
                  newBookAdd.book.isbn10 = e.target.value;
                  setBookAdd(newBookAdd);
                }}
              />
              <br></br>
            </div>
            <div className="form-group">
              &nbsp;&nbsp; <i className="fas fa-barcode"></i> &nbsp;&nbsp;{" "}
              <label htmlFor="info">ISBN 13</label>
              <input
                type="text"
                className="form-control"
                id="ISBN-13"
                aria-describedby="ISBN"
                placeholder="Enter ISBN 13"
                onChange={(e) => {
                  const newBookAdd = { ...bookAdd };
                  newBookAdd.book.isbn13 = e.target.value;
                  setBookAdd(newBookAdd);
                }}
              />
              <br></br>
            </div>
            &nbsp;&nbsp; <i className="far fa-calendar-alt"></i> &nbsp;&nbsp;{" "}
            <label htmlFor="info">Published Date</label>
            <br></br>
            <input
              type="date"
              id="birthday"
              name="birthday"
              onChange={(e) => {
                const newBookAdd = { ...bookAdd };
                newBookAdd.book.publishedDate = e.target.value;
                setBookAdd(newBookAdd);
              }}
            />
            <br></br>
            <i className="fas fa-file-image"></i>&nbsp;&nbsp;
            <label htmlFor="img">Add a Book Cover</label>
            <p>You can either choose to add an image file or a URL</p>
            <i className="fas fa-file-image"></i>&nbsp;&nbsp;
            <input type="file" id="img" name="img" accept="image/*" />
            <br></br>
            <br></br>
            <p> Or </p>
            <i className="fas fa-link"></i>&nbsp;&nbsp;{" "}
            <label htmlFor="info">Book Cover URL</label>
            <input
              type="url"
              className="form-control"
              id="url"
              aria-describedby="url"
              placeholder="Enter a URl for the cover image for your book"
              onChange={(e) => {
                const newBookAdd = { ...bookAdd };
                newBookAdd.book.coverImageUrl = e.target.value;
                setBookAdd(newBookAdd);
              }}
            />
            <br></br>
            <p style={{ textalign: "left", marginBottom: "6%" }}>
              <span style={{ float: "right" }}>
                <button
                  type="addbook"
                  className="btn btn-primary"
                  onClick={handleAddBook}
                >
                  Add Book
                </button>
              </span>
            </p>
          </form>
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
export default connect(mapStateToProps, { addBook })(AddBook);

export const AddBookPlain = () => {
  return (
    <div data-testid="row" class="row">
      <div data-testid="container" class="container">
        <ToastContainer position="top-center" autoClose={2000} />

        <div class="column">
          <h1 data-testid="form-title">Sell A Book Form</h1>
          <h5 data-testid="form-description">
            Please fill in the form below with the details of the book you want
            to sell. Thank you for choosing our platform to sell your book!
          </h5>
          <hr></hr>
          <br></br>
          <form>
            <div class="form-group">
              <i class="fas fa-book-open"> &nbsp;&nbsp;</i>
              <label data-testid="book-title" for="Book Title">
                {" "}
                Book Title
              </label>
              <input
                type="text"
                class="form-control"
                id="Book Title"
                aria-describedby="Book Title"
                placeholder="Enter Book Title"
              />
            </div>
            <div class="form-group">
              <i class="fas fa-user"></i> &nbsp;&nbsp;{" "}
              <label for="author">Author</label>
              <input
                type="text"
                class="form-control"
                id="Author"
                aria-describedby="Author"
                placeholder="Enter Author Name"
              />
            </div>
            <div className="form-group">
              <i class="fa fa-list-alt" aria-hidden="true"></i>&nbsp;&nbsp;
              <label for="category">Category</label>
              <select
                name="categorytype"
                className="form-control form-control-md"
              >
                <option selected value="Science Fiction">
                  {" "}
                  Science Fiction
                </option>
                <option value="Novel">Novel</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Thriller">Thriller</option>
                <option value="Romance">Romance</option>
              </select>
            </div>
            <div class="form-group">
              <i class="fas fa-info-circle"></i> &nbsp;&nbsp;{" "}
              <label for="status">Status (Published or Not)</label>
              <select className="form-control form-control-md">
                {" "}
                <option selected value="USED">
                  {" "}
                  Used
                </option>
                <option value="NEW">New</option>
              </select>
            </div>

            <div class="form-group">
              <i class="fas fa-dollar-sign"></i> &nbsp;&nbsp;{" "}
              <label for="price">Price</label>
              <input
                type="text"
                class="form-control"
                id="price"
                aria-describedby="price"
                placeholder="Enter Price"
              />
            </div>
            <div class="form-group">
              <i class="fas fa-info-circle"></i> &nbsp;&nbsp;{" "}
              <label for="quantity">Quantity</label>
              <input
                type="text"
                class="form-control"
                id="quantity"
                aria-describedby="quantity"
                placeholder="Enter Quantity"
              />
            </div>
            <div class="form-group">
              <i class="fas fa-info-circle"></i> &nbsp;&nbsp;{" "}
              <label for="quantity">Publisher</label>
              <input
                type="text"
                class="form-control"
                id="publisher-name"
                aria-describedby="publisher-name"
                placeholder="Enter Publisher"
              />
            </div>
            <div class="form-group">
              <i class="fas fa-bars"></i> &nbsp;&nbsp;{" "}
              <label for="long description">Long Description</label>
              <textarea
                class="form-control"
                id="long description"
                aria-describedby="long description"
                placeholder="Enter a long description"
              ></textarea>
            </div>

            <div class="form-group">
              <i class="fas fa-bars"></i> &nbsp;&nbsp;{" "}
              <label for="short description">Short Description</label>
              <textarea
                class="form-control"
                id="short description"
                aria-describedby="short description"
                placeholder="Enter a short description"
              ></textarea>
            </div>

            <div class="form-group">
              &nbsp;&nbsp; <i class="fas fa-barcode"></i> &nbsp;&nbsp;{" "}
              <label for="info">ISBN 10</label>
              <input
                type="text"
                class="form-control"
                id="ISBN-10"
                aria-describedby="ISBN"
                placeholder="Enter ISBN 10"
              />
              <br></br>
            </div>

            <div class="form-group">
              &nbsp;&nbsp; <i class="fas fa-barcode"></i> &nbsp;&nbsp;{" "}
              <label for="info">ISBN 13</label>
              <input
                type="text"
                class="form-control"
                id="ISBN-13"
                aria-describedby="ISBN"
                placeholder="Enter ISBN 13"
              />
              <br></br>
            </div>

            <form action="/action_page.php">
              &nbsp;&nbsp; <i class="far fa-calendar-alt"></i> &nbsp;&nbsp;{" "}
              <label for="info">Published Date</label>
              <br></br>
              <input type="date" id="birthday" name="birthday" />
            </form>

            <br></br>

            <form action="/action_page.php">
              <i class="fas fa-file-image"></i>&nbsp;&nbsp;
              <label for="img">Add a Book Cover</label>
              <p>You can either choose to add an image file or a URL</p>
              <i class="fas fa-file-image"></i>&nbsp;&nbsp;
              <input type="file" id="img" name="img" accept="image/*" />
              <br></br>
              <br></br>
              <p> Or </p>
              <i class="fas fa-link"></i>&nbsp;&nbsp;{" "}
              <label for="info">Book Cover URL</label>
              <input
                type="url"
                class="form-control"
                id="url"
                aria-describedby="url"
                placeholder="Enter a URl for the cover image for your book"
              />
            </form>
            <br></br>
            <p style={{ textalign: "left" }}>
              <span style={{ float: "right" }}>
                <button type="addbook" class="btn btn-primary">
                  Add Book
                </button>
                <p class="ex1"></p>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
