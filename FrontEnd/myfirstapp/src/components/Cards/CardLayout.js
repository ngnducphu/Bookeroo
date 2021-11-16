import React from "react";

import Card from "./Card";
import "./CardLayout.css";
import { connect } from "react-redux";
import { displayBooks } from "../../actions/bookActions";
import { useEffect } from "react";

export const CardLayout = (props) => {
  useEffect(() => {
    props.displayBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div data-testid="row-element" className="row">
        {/* Should use book id queried from db for key, this is for querying back later to display book information */}
        {props.bookState.books.length === 0
          ? ""
          : props.bookState.books.map((book, index) => {
              return (
                <div key={index} className="col-sm-4">
                  <Card bookProps={book} />
                </div>
              );
            })}
      </div>

      {props.bookState.books.length === 0 ? (
        <div id="notfound">
          <div className="notfound">
            <div className="notfound-404">
              {" "}
              <h2>0 books found in the system </h2>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

// Determine which state this component needs
const mapStateToProps = (state) => {
  return {
    bookState: state.bookState,
  };
};
export default connect(mapStateToProps, { displayBooks })(CardLayout);
