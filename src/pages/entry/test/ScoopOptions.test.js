import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ScoopOptions from "../ScoopOptions";

test("Red input box for invalid scoop count", async () => {
  render(<ScoopOptions name="" imagePath="" updateItemCount={jest.fn()} />);
  const chocolateInput = screen.getByRole("spinbutton");

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "-1");
  expect(chocolateInput).toHaveClass("is-invalid");

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "1.5");
  expect(chocolateInput).toHaveClass("is-invalid");

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "4");
  expect(chocolateInput).toHaveClass("is-invalid");

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(chocolateInput).not.toHaveClass("is-invalid");
});
