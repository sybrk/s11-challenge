// Spinner bileşenini buraya import edin ve değişik proplar aldığında nasıl render edildiğini test etmek için testler yazın
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import React from "react";

import Spinner from "../components/Spinner"

describe("Spinner Component on", () => {

  render(<Spinner on =  {true} />);
  const spinner = screen.getByTestId("spinner");

  // Test 1
  test("Spinner Rendering", () => {
      expect(spinner).toBeInTheDocument();
  })

  // Test 2 
  test("Spinner Text", () => {
      expect(spinner).toHaveTextContent("Lütfen bekleyin...");
  })
}),

describe("Spinner Component off", () => {

  render(<Spinner on =  {false} />);
  const spinner = screen.getByTestId("spinner");

  // Test 1
  test("Spinner should return null", () => {
      expect(spinner).toBeNull;
  })
})
