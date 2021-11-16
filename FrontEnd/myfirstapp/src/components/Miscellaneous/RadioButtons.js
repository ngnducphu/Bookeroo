import React from "react";
import { useEffect, useRef } from "react";
const RadioButtons = (props) => {
  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.checked = "checked";
  }, []);
  const handleSetRadioOption = (e) => {
    props.setRadioOption(e.target.value);
  };

  return (
    <div data-testid="radio-button-container">
      <div
        data-testid="radio-button-form"
        className="form-check form-check-inline"
      >
        <input
          className="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio1"
          value="title"
          ref={inputEl}
          data-testid="radio-button-form-input"
          onClick={handleSetRadioOption}
        />
        <label
          data-testid="radio-button-title-label"
          className="form-check-label"
          htmlFor="inlineRadio1"
        >
          Title
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio2"
          value="author"
          onClick={handleSetRadioOption}
        />
        <label className="form-check-label" htmlFor="inlineRadio2">
          Author
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio2"
          value="ISBN"
          onClick={handleSetRadioOption}
        />
        <label className="form-check-label" htmlFor="inlineRadio3">
          ISBN
        </label>
      </div>
    </div>
  );
};

export default RadioButtons;
