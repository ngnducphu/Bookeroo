import React from "react";
import "./ContactUs.css";
const ContactUs = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <p className="contact-us">Contact Us</p>
          <p>
            At Bookeroo, we love to talk to our customers! We're here to answer
            all your book-related inquiries (we also tell some great jokes). Our
            goal is to provide you with an stress-free shopping experience.
            We've got an exceptionally savvy, energetic Book Concierge team here
            at our Melbourne ready to get you all the answers you're looking
            for.
          </p>
        </div>
        <div className="col-6">
          <form>
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
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Text</label>
              <textarea
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter your enquiry here"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              SEND
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

export const ContactusPlain = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <p className="contact-us">Contact Us</p>
          <div data-testid="description">
            <p>
              At Bookeroo, we love to talk to our customers! We're here to
              answer all your book-related inquiries (we also tell some great
              jokes). Our goal is to provide you with an stress-free shopping
              experience. We've got an exceptionally savvy, energetic Book
              Concierge team here at our Melbourne ready to get you all the
              answers you're looking for.
            </p>
          </div>
        </div>
        <div className="col-6">
          <form>
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
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Text</label>
              <textarea
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter your enquiry here"
              ></textarea>
            </div>
            <div data-testid="button">
              {/* {label} */}
              <button type="submit" className="btn btn-primary">
                SEND
              </button>
            </div>
          </form>
          <div data-testid="row-err" className="row err"></div>
        </div>
      </div>
    </div>
  );
};
