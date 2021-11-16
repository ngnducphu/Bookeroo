import React from "react";
import "./Review.css";
import { Link } from "react-router-dom";

const Review = () => {
  return (
    <div class="row">
      <div class="container">
        <div class="column">
          <p>
            <img
              class="resize"
              src="https://www.baka-tsuki.org/project/images/9/9d/Sword_Art_Online_Progressive_Vol_1_-_001.jpg"
              alt="Sunflower"
            ></img>
            <h2> WRITE A REVIEW</h2>
            <p>
              {" "}
              <Link className="nav-link" to="/book">
                {" "}
                Sword Art Online: Progressive, Volume 1{" "}
              </Link>
            </p>
          </p>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <form>
            <div class="form-group">
              <label for="Review Headline">Review Headline</label>
              <input
                type="text"
                class="form-control"
                id="Review Headline"
                aria-describedby="Review Headline"
                placeholder="Enter Review Headline"
              />
            </div>
            <div class="form-group">
              <label for="fullname">Fullname</label>
              <input
                type="text"
                class="form-control"
                id="fullname"
                aria-describedby="fullname"
                placeholder="Enter fullname"
              />
            </div>
            <div class="form-group">
              <label for="email">Email address</label>
              <input
                type="email"
                class="form-control"
                id="email"
                aria-describedby="review"
                placeholder="Enter email"
              />
            </div>
            <div class="form-group">
              <label for="review">Write your review here</label>
              <textarea
                class="form-control"
                id="review"
                aria-describedby="review"
                placeholder="Enter your review here"
              ></textarea>
            </div>
            <p>Your Rating:</p>
            <meta charset="UTF-8"></meta>
            <link rel="stylesheet" type="text/css" href="style.css"></link>
            <div class="rate">
              <input type="radio" id="star5" name="rate" value="5" />
              <label for="star5" title="text">
                &nbsp;5 stars&nbsp;&nbsp;
              </label>
              <input type="radio" id="star4" name="rate" value="4" />
              <label for="star4" title="text">
                &nbsp;4 stars&nbsp;&nbsp;
              </label>
              <input type="radio" id="star3" name="rate" value="3" />
              <label for="star3" title="text">
                &nbsp;3 stars&nbsp;&nbsp;
              </label>
              <input type="radio" id="star2" name="rate" value="2" />
              <label for="star2" title="text">
                &nbsp;2 stars&nbsp;&nbsp;
              </label>
              <input type="radio" id="star1" name="rate" value="1" />
              <label for="star1" title="text">
                &nbsp;1 star
              </label>
            </div>
            <br></br>
            <button type="submit" class="btn btn-primary">
              Submit Review
            </button>
          </form>
          <p class="pad"></p>
        </div>
      </div>
    </div>
  );
};
export default Review;

export const ReviewPlain = (props) => {
  return (
    <div className="row">
      <div className="container">
        <div className="column">
          <p>
            <img
              className="resize"
              src="https://www.baka-tsuki.org/project/images/9/9d/Sword_Art_Online_Progressive_Vol_1_-_001.jpg"
              alt="Sunflower"
            ></img>
          </p>

          <h2> WRITE A REVIEW</h2>
          <Link className="nav-link" to="/book">
            Sword Art Online: Progressive, Volume 1
          </Link>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <form>
            <div className="form-group">
              <label htmlFor="Review Headline">Review Headline</label>
              <input
                type="text"
                className="form-control"
                id="Review Headline"
                aria-describedby="Review Headline"
                placeholder="Enter Review Headline"
              />
            </div>
            <div className="form-group">
              <label htmlFor="fullname">Fullname</label>
              <input
                type="text"
                className="form-control"
                id="fullname"
                aria-describedby="fullname"
                placeholder="Enter fullname"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="review"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="review">Write your review here</label>
              <textarea
                className="form-control"
                id="review"
                aria-describedby="review"
                placeholder="Enter your review here"
              ></textarea>
            </div>
            <p>Your Rating:</p>
            <meta charSet="UTF-8"></meta>
            <link rel="stylesheet" type="text/css" href="style.css"></link>
            <div className="rate">
              <input type="radio" id="star5" name="rate" value="5" />
              <label htmlFor="star5" title="text">
                &nbsp;5 stars&nbsp;&nbsp;
              </label>
              <input type="radio" id="star4" name="rate" value="4" />
              <label htmlFor="star4" title="text">
                &nbsp;4 stars&nbsp;&nbsp;
              </label>
              <input type="radio" id="star3" name="rate" value="3" />
              <label htmlFor="star3" title="text">
                &nbsp;3 stars&nbsp;&nbsp;
              </label>
              <input type="radio" id="star2" name="rate" value="2" />
              <label htmlFor="star2" title="text">
                &nbsp;2 stars&nbsp;&nbsp;
              </label>
              <input type="radio" id="star1" className="rate" value="1" />
              <label htmlFor="star1" title="text">
                &nbsp;1 star
              </label>
            </div>
            <br></br>
            <button type="submit" className="btn btn-primary">
              Submit Review
            </button>
          </form>
          <p className="ex1"></p>
        </div>
      </div>
    </div>
  );
};
