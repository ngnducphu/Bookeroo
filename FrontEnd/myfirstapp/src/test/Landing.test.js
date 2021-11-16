import React from "react";
import { render, cleanup } from "@testing-library/react";
import { LandingPlain } from "../components/Layout/Landing";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
afterEach(cleanup);

test("Render without crashing", () => {
  render(
    <BrowserRouter>
      <LandingPlain />
    </BrowserRouter>
  );
});

test("matches snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <LandingPlain />
      </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
