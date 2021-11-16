import React from "react";
import { render, cleanup } from "@testing-library/react";
import { BookPlain } from "../components/Pages/Book";
import "@testing-library/jest-dom";
import ReactTestRenderer from "react-test-renderer";
afterEach(cleanup);

const viewBook = {
  title: "The Great Gatsby",
  imageUrl: "https://api.time.com/wp-content/uploads/2015/04/great-gatsby.jpg",
  authors: [{ name: "F.Scott Fitgerald" }],
  price: "20",
  shortDescription:
    " Generally considered to be F. Scott Fitzgerald's finest novel, The Great Gatsby is a consummate summary of the 'roaring twenties'....read more",
};

test("Render without crashing", () => {
  render(<BookPlain bookState={{ viewBook }} />);
});

test("renders book container element", () => {
  const { getByTestId } = render(<BookPlain bookState={{ viewBook }} />);
  const element = getByTestId("container");
  expect(element).toBeInTheDocument();
});

test("renders book row element", () => {
  const { getByTestId } = render(<BookPlain bookState={{ viewBook }} />);
  const element = getByTestId("row");
  expect(element).toBeInTheDocument();
});

test("renders book col element", () => {
  const { getByTestId } = render(<BookPlain bookState={{ viewBook }} />);
  const element = getByTestId("col");
  expect(element).toBeInTheDocument();
});

test("renders book title element", () => {
  const { getByTestId } = render(<BookPlain bookState={{ viewBook }} />);
  const element = getByTestId("book-title");
  expect(element).toBeInTheDocument();
});

test("renders book title element", () => {
  const { getByTestId } = render(<BookPlain bookState={{ viewBook }} />);
  const element = getByTestId("book-title");
  expect(element).toHaveTextContent("The Great Gatsby");
});

test("renders book price element", () => {
  const { getByTestId } = render(<BookPlain bookState={{ viewBook }} />);
  const element = getByTestId("price");
  expect(element).toBeInTheDocument();
});

test("renders book price element correct content", () => {
  const { getByTestId } = render(<BookPlain bookState={{ viewBook }} />);
  const element = getByTestId("price");
  expect(element).toHaveTextContent("Price: $ 20");
});

// snapshot testing
test("matches snapshot", () => {
  const tree = ReactTestRenderer.create(
    <BookPlain bookState={{ viewBook }} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
