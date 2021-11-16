import React from "react";
import { render, cleanup } from "@testing-library/react";
import { AddBookPlain } from "../components/Pages/AddBook";
import "@testing-library/jest-dom";
import ReactTestRenderer from "react-test-renderer";

afterEach(cleanup);

test("Render without crashing", () => {
  render(<AddBookPlain />);
});

test("Render row elemnt", () => {
  const { getByTestId } = render(<AddBookPlain />);

  const element = getByTestId("row");
  expect(element).toBeInTheDocument();
});

test("Render container element", () => {
  const { getByTestId } = render(<AddBookPlain />);

  const element = getByTestId("container");
  expect(element).toBeInTheDocument();
});

test("Render form title element", () => {
  const { getByTestId } = render(<AddBookPlain />);

  const element = getByTestId("form-title");
  expect(element).toBeInTheDocument();
});

test("Render form title element", () => {
  const { getByTestId } = render(<AddBookPlain />);

  const element = getByTestId("form-title");
  expect(element).toHaveTextContent("Sell A Book Form");
});

test("Render form description element", () => {
  const { getByTestId } = render(<AddBookPlain />);

  const element = getByTestId("form-description");
  expect(element).toHaveTextContent(
    "Please fill in the form below with the details of the book you want to sell. Thank you for choosing our platform to sell your book!"
  );
});

test("Render book title element", () => {
  const { getByTestId } = render(<AddBookPlain />);

  const element = getByTestId("book-title");
  expect(element).toBeInTheDocument();
});

// snapshot testing
test("matches snapshot", () => {
  const tree = ReactTestRenderer.create(<AddBookPlain />).toJSON();

  expect(tree).toMatchSnapshot();
});
