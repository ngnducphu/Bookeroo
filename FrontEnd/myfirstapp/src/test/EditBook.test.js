import React from "react";
import { render, cleanup } from "@testing-library/react";
import { EditBookPlain } from "../components/Pages/EditBook";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

afterEach(cleanup);

/* Mock book object to test injection of props */
const editBook = {
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
      <EditBookPlain bookState={{ editBook }} />
    </BrowserRouter>
  );
});

test("renders short description ", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <EditBookPlain bookState={{ editBook }} />
    </BrowserRouter>
  );
  const shortDescriptionElement = getByTestId("short-description");
  expect(shortDescriptionElement).toBeInTheDocument();
});

test("renders short description content", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <EditBookPlain bookState={{ editBook }} />
    </BrowserRouter>
  );
  const shortDescriptionElement = getByTestId("short-description");
  expect(shortDescriptionElement).toHaveTextContent("Short Description");
});
