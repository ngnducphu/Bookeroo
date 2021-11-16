import React from "react";
import { render, cleanup } from "@testing-library/react";
import DashboardPlain from "../components/Dashboard";

import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";

afterEach(cleanup);
test("Render without crashing", () => {
  render(
    <BrowserRouter>
      <DashboardPlain />
    </BrowserRouter>
  );
});

test("matches snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <DashboardPlain />
      </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
