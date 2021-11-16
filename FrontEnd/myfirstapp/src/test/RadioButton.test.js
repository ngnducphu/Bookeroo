import React from "react";
import { render, cleanup } from "@testing-library/react";
import RadioButtons from "../components/Miscellaneous/RadioButtons";
import "@testing-library/jest-dom";
afterEach(cleanup);

test("renders without crashing", () => {
  render(<RadioButtons />);
});

test("renders radio button container", () => {
  const { getByTestId } = render(<RadioButtons />);
  const containerElement = getByTestId("radio-button-container");
  expect(containerElement).toBeInTheDocument();
});

test("renders radio button form", () => {
  const { getByTestId } = render(<RadioButtons />);

  const radioBtnForm = getByTestId("radio-button-form");

  expect(radioBtnForm).toBeInTheDocument();
});

test("renders radio button form input", () => {
  const { getByTestId } = render(<RadioButtons />);

  const radioBtnForm = getByTestId("radio-button-form-input");

  expect(radioBtnForm).toBeInTheDocument();
});

test("renders radio button title label", () => {
  const { getByTestId } = render(<RadioButtons />);

  const titleLabel = getByTestId("radio-button-title-label");

  expect(titleLabel).toBeInTheDocument();
});

test("renders radio button title label", () => {
  const { getByTestId } = render(<RadioButtons />);

  const titleLabel = getByTestId("radio-button-title-label");

  expect(titleLabel).toHaveTextContent("Title");
});
