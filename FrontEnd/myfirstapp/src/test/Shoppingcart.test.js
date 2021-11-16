import React from "react";
import { render, cleanup } from "@testing-library/react";
import { ShoppingCartPlain } from "../components/Pages/ShoppingCart";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
afterEach(cleanup);

test("Render without crashing", () => {
  render(
    <BrowserRouter>
      <ShoppingCartPlain />
    </BrowserRouter>
  );
});

test("Render container element", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <ShoppingCartPlain />
    </BrowserRouter>
  );
  const element = getByTestId("container");
  expect(element).toBeInTheDocument();
});

test("Render cart title element", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <ShoppingCartPlain />
    </BrowserRouter>
  );

  const element = getByTestId("form-title");
  expect(element).toBeInTheDocument();
});

test("renders remove button element", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <ShoppingCartPlain />
    </BrowserRouter>
  );
  const element = getByTestId("remove-btn");
  expect(element).toBeInTheDocument();
});

test("renders buy button element", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <ShoppingCartPlain />
    </BrowserRouter>
  );
  const element = getByTestId("buy-btn");
  expect(element).toBeInTheDocument();
});

test("matches snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <ShoppingCartPlain />
      </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
