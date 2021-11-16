import React from "react";
import { cleanup } from "@testing-library/react";
import { CardLayout } from "../components/Cards/CardLayout";
import "@testing-library/jest-dom";
import ShallowRenderer from "react-test-renderer/shallow";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

afterEach(cleanup);
configure({ adapter: new Adapter() });

// mock book state for testing purpose
const books = [
  {
    title: "The Great Gatsby",
    imageUrl:
      "https://api.time.com/wp-content/uploads/2015/04/great-gatsby.jpg",
    author: "F.Scott Fitgerald",
    price: "20",
    shortDescription:
      " Generally considered to be F. Scott Fitzgerald's finest novel, The Great Gatsby is a consummate summary of the 'roaring twenties'.",
  },
  {
    title: "The Great Gatsby",
    imageUrl:
      "https://api.time.com/wp-content/uploads/2015/04/great-gatsby.jpg",
    author: "F.Scott Fitgerald",
    price: "20",
    shortDescription:
      " Generally considered to be F. Scott Fitzgerald's finest novel, The Great Gatsby is a consummate summary of the 'roaring twenties'.",
  },
  {
    title: "The Great Gatsby",
    imageUrl:
      "https://api.time.com/wp-content/uploads/2015/04/great-gatsby.jpg",
    author: "F.Scott Fitgerald",
    price: "20",
    shortDescription:
      " Generally considered to be F. Scott Fitzgerald's finest novel, The Great Gatsby is a consummate summary of the 'roaring twenties'.",
  },
];
test("renders without crashing", () => {
  const renderer = new ShallowRenderer();

  renderer.render(<CardLayout bookState={{ books }} />);
});

test("renders a div type element", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<CardLayout bookState={{ books }} />);

  const result = renderer.getRenderOutput();

  expect(result.type).toBe("div");
});
