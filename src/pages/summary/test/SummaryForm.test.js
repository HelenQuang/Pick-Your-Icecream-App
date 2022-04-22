import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("initial conditions", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button", { name: "Confirm Order" });
  expect(button).toBeDisabled();
  expect(checkbox).not.toBeChecked();
});

test("check box and order", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button", { name: "Confirm Order" });

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
});
