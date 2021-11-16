import React from "react";
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { mount, configure } from "enzyme";
import Landing from "../components/Layout/Landing";
import Adapter from "enzyme-adapter-react-16";
import PageNotFound from "../components/Pages/404";
import ReactTestRenderer from "react-test-renderer";

configure({ adapter: new Adapter() });
afterEach(cleanup);
// jest.mock("firebase/app");

test("invalid path should redirect to 404", () => {
  const wrapper = mount(
    <BrowserRouter initialEntries={["/random"]}>
      <PageNotFound />
    </BrowserRouter>
  );
  expect(wrapper.find(Landing).length).toBe(0);
  expect(wrapper.find(PageNotFound).length).toBe(1);
});

test("valid path should not redirect to 404", async () => {
  const wrapper = mount(
    <BrowserRouter initialEntries={["/"]}>
      <Landing />
    </BrowserRouter>
  );
  expect(wrapper.find(Landing).length).toBe(1);
  expect(wrapper.find(PageNotFound).length).toBe(0);
});

test("renders description ", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <PageNotFound />
    </BrowserRouter>
  );
  const DescriptionElement = getByTestId("notfound");
  expect(DescriptionElement).toBeInTheDocument();
});

test("matches snapshot", () => {
  const tree = ReactTestRenderer.create(
    <BrowserRouter>
      <PageNotFound />
    </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
