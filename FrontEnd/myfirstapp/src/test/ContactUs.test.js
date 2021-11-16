import React from "react";
import { render, cleanup } from "@testing-library/react";
import { HeaderPlain } from "../components/Layout/Header";
import { ContactusPlain } from "../components/Pages/ContactUs";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";

afterEach(cleanup);

test("Render without crashing", () => {
  render(
    <BrowserRouter>
      <HeaderPlain />
    </BrowserRouter>
  );
});

test("renders  description ", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <ContactusPlain />
    </BrowserRouter>
  );
  const DescriptionElement = getByTestId("description");
  expect(DescriptionElement).toBeInTheDocument();
});

test("matches snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <HeaderPlain />
      </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
