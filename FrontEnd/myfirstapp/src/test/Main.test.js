import React from "react";
import { render, cleanup } from "@testing-library/react";
import { MainPlain } from "../components/Pages/Main";
import "@testing-library/jest-dom";
import ReactTestRenderer from "react-test-renderer";
afterEach(cleanup);

test("Render without crashing", () => {
  render(<MainPlain />);
});

test("renders input element", () => {
  const { getByTestId } = render(<MainPlain />);
  const element = getByTestId("input");
  expect(element).toBeInTheDocument();
});

test("renders search button element", () => {
  const { getByTestId } = render(<MainPlain />);
  const element = getByTestId("search-btn");
  expect(element).toBeInTheDocument();
});

test("renders search button element", () => {
  const { getByTestId } = render(<MainPlain />);
  const element = getByTestId("search-btn");
  expect(element).toHaveTextContent("SEARCH");
});

test("renders row element", () => {
  const { getByTestId } = render(<MainPlain />);
  const element = getByTestId("row-err");
  expect(element).toBeInTheDocument();
});

test("renders card title element", () => {
  const { getByTestId } = render(<MainPlain />);
  const element = getByTestId("form");
  expect(element).toBeInTheDocument();
});

test("matches snapshot", () => {
  const tree = ReactTestRenderer.create(<MainPlain />).toJSON();

  expect(tree).toMatchSnapshot();
});
