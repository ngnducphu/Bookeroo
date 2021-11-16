import React from "react";
import { render, cleanup } from "@testing-library/react";
import { ReviewPlain } from "../components/Pages/Review";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
afterEach(cleanup);

test("Render without crashing", () => {
  render(
    <BrowserRouter>
      <ReviewPlain />
    </BrowserRouter>
  );
});

test("matches snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <ReviewPlain />
      </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
