import React from "react";
import "./404.css";
const PageNotFound = () => {
  return (
    <div id="notfound" data-testid="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h1>
        </div>
        <h2>We are sorry, page not found </h2>
      </div>
    </div>
  );
};

export default PageNotFound;
