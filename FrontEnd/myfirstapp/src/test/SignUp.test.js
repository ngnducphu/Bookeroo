import React from "react";
import { render, cleanup } from "@testing-library/react";
import { RegisterPlain } from "../components/UserManagement/Register";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";

afterEach(cleanup);

test("Render without crashing", () => {
  render(
    <BrowserRouter>
      <RegisterPlain />
    </BrowserRouter>
  );
});

test("matches snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <RegisterPlain />
      </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
