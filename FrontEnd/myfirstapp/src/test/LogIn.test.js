import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { render, cleanup } from "@testing-library/react";
import { LoginPlain } from "../components/UserManagement/Login";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { configure } from "enzyme";
import renderer from "react-test-renderer";

afterEach(cleanup);
configure({ adapter: new Adapter() });
test("Render without crashing", () => {
  render(
    <BrowserRouter>
      <LoginPlain />
    </BrowserRouter>
  );
});

test("matches snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <LoginPlain />
      </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
//   test("submits", async () => {
//     const form = undefined;
//     const onSubmit = jest.fn();
//     const { getByTestId } = render(<LoginPlain onSubmit={onSubmit} />);
//     // const form = getByTestId("form");

//     fireEvent.submit(getByTestId("form"));
//     expect(onSubmit).toHaveBeenCalled();
//   });
