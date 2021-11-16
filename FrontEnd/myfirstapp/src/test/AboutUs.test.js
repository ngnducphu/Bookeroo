import React from "react";
import { render, cleanup } from "@testing-library/react";
import { HeaderPlain } from "../components/Layout/Header";
import { AboutusPlain } from "../components/Pages/AboutUs";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import ReactTestRenderer from "react-test-renderer";

afterEach(cleanup);

test("Render without crashing", () => {
  render(
    <BrowserRouter>
      <AboutusPlain />
    </BrowserRouter>
  );
});

test("renders  description ", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <AboutusPlain />
    </BrowserRouter>
  );
  const DescriptionElement = getByTestId("description");
  expect(DescriptionElement).toBeInTheDocument();
});

test("matches snapshot", () => {
  const tree = ReactTestRenderer.create(
    <BrowserRouter>
      <HeaderPlain />
    </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
