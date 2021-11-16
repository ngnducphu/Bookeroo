import React from "react";
import "./AboutUs.css";
/* A simple aboutus page */
const AboutUs = () => {
  return (
    <div className="container">
      <p className="text-center about-us-text"> About Us</p>
      <div className="row">
        <div className="col-6">
          <a href="https://ibb.co/SQwF7fK">
            <img
              src="https://i.ibb.co/yhFHB48/book-search.png"
              alt="book-search"
              border="0"
            />
          </a>{" "}
        </div>
        <div className="col-6">
          <p className="title-content-text">
            Redefining book selling/buying experience
          </p>
          At Bookeroo we want to democratize knowlegde by providing an
          accessible way for people to sell and buy book online. We believe in
          the power of knowledge and community.{" "}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

export const AboutusPlain = (props) => {
  return (
    <div className="container">
      <p className="text-center about-us-text"> About Us</p>
      <div className="row">
        <div className="col-6">
          <a href="https://ibb.co/SQwF7fK">
            <img
              src="https://i.ibb.co/yhFHB48/book-search.png"
              alt="book-search"
              border="0"
            />
          </a>{" "}
        </div>
        <div data-testid="description" className="col-6">
          <p className="title-content-text">
            Redefining book selling/buying experience
          </p>
          At Bookeroo we want to democratize knowlegde by providing an
          accessible way for people to sell and buy book online. We believe in
          the power of knowledge and community.{" "}
        </div>
      </div>
    </div>
  );
};
