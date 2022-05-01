import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

test("initial conditions", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button", { name: "Confirm order" });
  expect(button).toBeDisabled();
  expect(checkbox).not.toBeChecked();
});

test("check box and order", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button", { name: "Confirm order" });

  userEvent.click(checkbox);
  expect(button).toBeEnabled();

  userEvent.click(checkbox);
  expect(button).toBeDisabled();
});

test("popover reacts to mouse hover", async () => {
  render(<SummaryForm />);
  const nullPopover = screen.queryByText(
    "Thank you for reading. But...No ice cream will actually be delivered"
  );
  expect(nullPopover).not.toBeInTheDocument();

  const termsAndConditions = screen.getByText("Terms and Conditions");

  userEvent.hover(termsAndConditions);
  const popover = screen.getByText(
    "Thank you for reading. But...No ice cream will actually be delivered"
  );
  expect(popover).toBeInTheDocument();

  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(
      "Thank you for reading. But...No ice cream will actually be delivered"
    )
  );
});
