import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the app", () => {
  render(<App />);
  const headingElement = screen.getByText(/Player Comparison/i);
  expect(headingElement).toBeInTheDocument();
});
