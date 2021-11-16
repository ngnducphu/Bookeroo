import React from "react";
import { render, cleanup } from "@testing-library/react";
import { CardPlain as Card } from "../components/Cards/Card";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import ReactTestRenderer from "react-test-renderer";
afterEach(cleanup);

/* Mock book object to test injection of props */
const book = {
  title: "The Great Gatsby",
  imageUrl: "https://api.time.com/wp-content/uploads/2015/04/great-gatsby.jpg",
  authors: [{ name: "F.Scott Fitgerald" }],
  price: "20",
  shortDescription:
    " Generally considered to be F. Scott Fitzgerald's finest novel, The Great Gatsby is a consummate summary of the 'roaring twenties'....read more",
};
test("renders without crashing", () => {
  render(
    <BrowserRouter>
      <Card bookProps={book} />{" "}
    </BrowserRouter>
  );
});

test("renders card title element", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Card bookProps={book} />{" "}
    </BrowserRouter>
  );
  const titleElement = getByTestId("card-title-element");
  expect(titleElement).toBeInTheDocument();
});

test("renders card title element with correct content", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Card bookProps={book} />{" "}
    </BrowserRouter>
  );
  const titleElement = getByTestId("card-title-element");
  expect(titleElement).toHaveTextContent(book.title);
});

test("renders card author element", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Card bookProps={book} />{" "}
    </BrowserRouter>
  );
  const titleElement = getByTestId("card-author-element");
  expect(titleElement).toBeInTheDocument();
});

test("renders card author with correct content", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Card bookProps={book} />{" "}
    </BrowserRouter>
  );
  const titleElement = getByTestId("card-author-element");
  expect(titleElement).toHaveTextContent(book.authors[0].name);
});

test("renders card paragraph short description element", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Card bookProps={book} />{" "}
    </BrowserRouter>
  );
  const titleElement = getByTestId("card-paragraph-short-description");
  expect(titleElement).toBeInTheDocument();
});

// test("renders card paragraph short description element content", () => {
//   const { getByTestId } = render(
//     <BrowserRouter>
//       <Card bookProps={book} />{" "}
//     </BrowserRouter>
//   );
//   const titleElement = getByTestId("card-paragraph-short-description");
//   expect(titleElement).toHaveTextContent(book.shortDescription);
// });

test("renders card paragraph price element", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Card bookProps={book} />{" "}
    </BrowserRouter>
  );
  const titleElement = getByTestId("card-paragraph-price");
  expect(titleElement).toBeInTheDocument();
});

test("renders card paragraph price element content", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Card bookProps={book} />{" "}
    </BrowserRouter>
  );
  const titleElement = getByTestId("card-paragraph-price");
  expect(titleElement).toHaveTextContent(`$ ${book.price}`);
});

test("renders add to cart button element", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Card bookProps={book} />{" "}
    </BrowserRouter>
  );
  const titleElement = getByTestId("card-add-to-cart-element");
  expect(titleElement).toBeInTheDocument();
});

test("renders add to cart button element", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Card bookProps={book} />{" "}
    </BrowserRouter>
  );
  const titleElement = getByTestId("card-add-to-cart-element");
  expect(titleElement).toHaveTextContent("ADD TO CART");
});

test("renders card image element", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Card bookProps={book} />{" "}
    </BrowserRouter>
  );
  const titleElement = getByTestId("card-image-element");
  expect(titleElement).toBeInTheDocument();
});

test("renders add to cart button element", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Card bookProps={book} />{" "}
    </BrowserRouter>
  );
  const titleElement = getByTestId("card-body-element");
  expect(titleElement).toBeInTheDocument();
});

test("renders card root element", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Card bookProps={book} />{" "}
    </BrowserRouter>
  );
  const titleElement = getByTestId("card-element");
  expect(titleElement).toBeInTheDocument();
});

// snapshot testing
test("matches snapshot", () => {
  const tree = ReactTestRenderer.create(
    <BrowserRouter>
      <Card bookProps={book} />{" "}
    </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
