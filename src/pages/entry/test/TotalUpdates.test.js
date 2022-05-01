import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal", async () => {
  render(<Options optionType="scoops" />);

  const scoopsSubtotal = screen.getByText("Scoops total: €", {
    exact: false,
  });

  //Initial state
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  //Add 1 salted caramel scoop
  const saltedCaramelInput = await screen.findByRole("spinbutton", {
    name: "Salted Caramel:",
  });
  userEvent.clear(saltedCaramelInput);
  userEvent.type(saltedCaramelInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  //Add 2 chocolate scoops
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate:",
  });
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
  const cherriesInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesInput);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  //Add 1 M&Ms toppings
  const MMsInput = await screen.findByRole("checkbox", { name: "M&Ms" });
  userEvent.click(MMsInput);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  //Add 1 gummy bears toppings
  const gummyBearsInput = await screen.findByRole("checkbox", {
    name: "Gummy Bears",
  });
  userEvent.click(gummyBearsInput);
  expect(toppingsSubtotal).toHaveTextContent("4.50");

  //Remove 1 gummy bears
  userEvent.click(gummyBearsInput);
  expect(toppingsSubtotal).toHaveTextContent("3.00");
});

describe("grand total", () => {
  test("grand total updates if 1 scoop added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total: €", { exact: false });
    expect(grandTotal).toHaveTextContent("0.00");

    const saltedCaramelInput = await screen.findByRole("spinbutton", {
      name: "Salted Caramel:",
    });
    userEvent.clear(saltedCaramelInput);
    userEvent.type(saltedCaramelInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    const MMsInput = await screen.findByRole("checkbox", { name: "M&Ms" });
    userEvent.click(MMsInput);
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates if 1 topping added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total: €", { exact: false });
    expect(grandTotal).toHaveTextContent("0.00");

    const MMsInput = await screen.findByRole("checkbox", { name: "M&Ms" });
    userEvent.click(MMsInput);
    expect(grandTotal).toHaveTextContent("1.50");

    const saltedCaramelInput = await screen.findByRole("spinbutton", {
      name: "Salted Caramel:",
    });
    userEvent.clear(saltedCaramelInput);
    userEvent.type(saltedCaramelInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total starts if item is removed", async () => {
    render(<OrderEntry />);
    const MMsInput = await screen.findByRole("checkbox", { name: "M&Ms" });
    userEvent.click(MMsInput);

    const saltedCaramelInput = await screen.findByRole("spinbutton", {
      name: "Salted Caramel:",
    });
    userEvent.clear(saltedCaramelInput);
    userEvent.type(saltedCaramelInput, "2");

    userEvent.clear(saltedCaramelInput);
    userEvent.type(saltedCaramelInput, "1");

    const grandTotal = screen.getByText("Grand total: €", { exact: false });
    expect(grandTotal).toHaveTextContent("3.50");

    userEvent.click(MMsInput);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
