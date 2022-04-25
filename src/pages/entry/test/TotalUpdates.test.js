import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("update scoop subtotal", async () => {
  render(<Options optionType="scoops" />);
  const scoopsSubtotal = screen.getByText("Scoops total: €", {
    exact: false,
  });

  //Initial state
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  //Add 1 salted caramel scoop
  const saltedCaramelInput = screen.getByRole("spinbutton", {
    name: "Salted Caramel",
  });
  userEvent.clear(saltedCaramelInput);
  userEvent.type(saltedCaramelInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  //Add 2 chocolate scoops
  const chocolateInput = screen.getByRole("spinbutton", { name: "Chocolate" });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update topping subtotal", async () => {
  render(<Options optionType="toppings" />);
  const toppingsSubtotal = screen.getByText("Toppings total: €", {
    exact: false,
  });

  //Initial state
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  //Add 1 cheeries topping
  const cherriesInput = screen.getByRole("spinbutton", {
    name: "Cherries",
  });
  userEvent.clear(cherriesInput);
  userEvent.type(cherriesInput, "1");
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  //Add 2 M&Ms toppings
  const MMsInput = screen.getByRole("spinbutton", { name: "M&Ms" });
  userEvent.clear(MMsInput);
  userEvent.type(MMsInput, "2");
  expect(toppingsSubtotal).toHaveTextContent("4.50");

  //Add 4 gummy bears toppings
  const gummyBearsInput = screen.getByRole("spinbutton", {
    name: "Gummy Bears",
  });
  userEvent.clear(gummyBearsInput);
  userEvent.type(gummyBearsInput, "4");
  expect(toppingsSubtotal).toHaveTextContent("10.50");
});
