import React from "react";
import { render, cleanup } from "@testing-library/react";
import { ProfilePlain } from "../components/Pages/Profile";
import "@testing-library/jest-dom";
afterEach(cleanup);

const person = {
  givenName: "Ted",
  surname: "Vu",
  username: "tedvu184@gmail.com",
  address: "6 Tylers Run Keysborough VIC 3173",
  phoneNumber: "0426991804",
};

test("Render without crashing", () => {
  render(<ProfilePlain person={person} />);
});

test("Render root container element", () => {
  const { getByTestId } = render(<ProfilePlain person={person} />);

  const element = getByTestId("root-container");
  expect(element).toBeInTheDocument();
});

test("Render full name element", () => {
  const { getByTestId } = render(<ProfilePlain person={person} />);

  const element = getByTestId("fullname");
  expect(element).toBeInTheDocument();
});

test("Render email element", () => {
  const { getByTestId } = render(<ProfilePlain person={person} />);

  const element = getByTestId("email");
  expect(element).toBeInTheDocument();
});

test("Render phone number element", () => {
  const { getByTestId } = render(<ProfilePlain person={person} />);

  const element = getByTestId("phoneNumber");
  expect(element).toBeInTheDocument();
});

test("Render phone number element", () => {
  const { getByTestId } = render(<ProfilePlain person={person} />);

  const element = getByTestId("address");
  expect(element).toBeInTheDocument();
});
