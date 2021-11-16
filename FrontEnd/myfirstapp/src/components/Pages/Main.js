import React from "react";

import RadioButtons from "../Miscellaneous/RadioButtons";
import CardLayout from "../Cards/CardLayout";
import { connect } from "react-redux";

import { searchBooks } from "../../actions/bookActions";
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./Main.css";

const Main = (props) => {
  const [input, setInput] = useState("");
  const [radioOption, setRadioOption] = useState("Title");
  const history = useHistory();
  const inputEl = useRef(null);
  const errSpan = useRef(null);

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setInput("");
      inputEl.current.focus();

      props.searchBooks(radioOption, input, history);
    } else {
      // adding error here indicating input cannot be left blank
      errSpan.current.innerHTML = "Search term must not be empty";
    }
  };

  const handleChangeInput = (e) => {
    errSpan.current.innerHTML = "";
    setInput(e.target.value);
  };
  return (
    <div className="container">
      <form className="my-4 form-inline row form">
        <input
          placeholder="Type keyword here to start search"
          className="form-control col mr-2"
          onChange={handleChangeInput}
          value={input}
          ref={inputEl}
        />
        <button
          className="btn btn-primary searchBtn"
          onClick={handleSearchClick}
        >
          SEARCH
        </button>
      </form>

      <div className="row err" ref={errSpan}></div>

      <RadioButtons setRadioOption={setRadioOption} />
      <CardLayout />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, { searchBooks })(Main);

export const MainPlain = () => {
  return (
    <div data-testid="container" className="container">
      <form data-testid="form" className="my-4 form-inline row form">
        <input
          data-testid="input"
          placeholder="Type keyword here to start search"
          className="form-control col mr-2"
        />
        <button data-testid="search-btn" className="btn btn-primary searchBtn">
          SEARCH
        </button>
      </form>

      <div data-testid="row-err" className="row err"></div>
    </div>
  );
};
