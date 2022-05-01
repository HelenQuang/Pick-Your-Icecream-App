import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("Order Phase", async () => {
  render(<App />);

  //Add 1 salted caramel scoop
  const saltedCaramelInput = await screen.findByRole("spinbutton", {
    name: "Salted Caramel:",
  });
  userEvent.clear(saltedCaramelInput);
  userEvent.type(saltedCaramelInput, "1");

  //Add 2 chocolate scoops
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate:",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");

  //Add 1 M&Ms toppings
  const MMsInput = await screen.findByRole("checkbox", { name: "M&Ms" });
  userEvent.click(MMsInput);

  //Order button in OrderEntry
  const orderBtn = screen.getByRole("button", { name: "Place your order" });
  userEvent.click(orderBtn);

  //Check summary subtotals info based on order
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: €6.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: €1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();

  // check summary option items
  expect(screen.getByText("1 Salted Caramel")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("M&Ms")).toBeInTheDocument();

  //Confirm button in SummaryForm
  const confirmBtn = screen.getByRole("button", { name: "Confirm order" });
  const checkbox = screen.getByRole("checkbox");

  userEvent.click(checkbox);
  userEvent.click(confirmBtn);

  // Expect "loading" to show
  const loading = screen.getByText("Loading...");
  expect(loading).toBeInTheDocument();

  // check confirmation page text
  const thankYouHeader = await screen.findByRole("heading", {
    name: "Thank You!",
  });
  expect(thankYouHeader).toBeInTheDocument();

  // expect that loading has disappeared
  const notLoading = screen.queryByText("Loading...");
  expect(notLoading).not.toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // find and click "new order" button on confirmation page
  const newBtn = screen.getByRole("button", { name: "Buy a new order" });
  userEvent.click(newBtn);

  //Check scoops and toppings subtotal have been reset
  const scoopsSubtotal = await screen.findByText("Scoops total: €0.00");
  const toppingsSubtotal = screen.getByText("Toppings total: €0.00");

  expect(scoopsSubtotal).toBeInTheDocument();
  expect(toppingsSubtotal).toBeInTheDocument();

  // wait for items to appear so that Testing Library doesn't get angry about stuff
  // happening after test is over
  await screen.findByRole("spinbutton", { name: "Chocolate:" });
  await screen.findByRole("checkbox", { name: "M&Ms" });
});

test("Order Phase if no toppings selected", async () => {
  render(<App />);

  //Add 1 salted caramel scoop
  const saltedCaramelInput = await screen.findByRole("spinbutton", {
    name: "Salted Caramel:",
  });
  userEvent.clear(saltedCaramelInput);
  userEvent.type(saltedCaramelInput, "1");

  //Add 2 chocolate scoops
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate:",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");

  //Order button in OrderEntry
  const orderBtn = screen.getByRole("button", { name: "Place your order" });
  userEvent.click(orderBtn);

  //Check summary subtotals info based on order
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: €6.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.queryByRole("heading", {
    name: /toppings/i,
  });
  expect(toppingsHeading).not.toBeInTheDocument();

  // check summary option items
  expect(screen.getByText("1 Salted Caramel")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();

  //Confirm button in SummaryForm
  const confirmBtn = screen.getByRole("button", { name: "Confirm order" });
  const checkbox = screen.getByRole("checkbox");

  userEvent.click(checkbox);
  userEvent.click(confirmBtn);

  // Expect "loading" to show
  const loading = screen.getByText("Loading...");
  expect(loading).toBeInTheDocument();

  // check confirmation page text
  const thankYouHeader = await screen.findByRole("heading", {
    name: "Thank You!",
  });
  expect(thankYouHeader).toBeInTheDocument();

  // expect that loading has disappeared
  const notLoading = screen.queryByText("Loading...");
  expect(notLoading).not.toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // find and click "new order" button on confirmation page
  const newBtn = screen.getByRole("button", { name: "Buy a new order" });
  userEvent.click(newBtn);

  //Check scoops and toppings subtotal have been reset
  const scoopsSubtotal = await screen.findByText("Scoops total: €0.00");
  const toppingsSubtotal = screen.getByText("Toppings total: €0.00");

  expect(scoopsSubtotal).toBeInTheDocument();
  expect(toppingsSubtotal).toBeInTheDocument();

  // wait for items to appear so that Testing Library doesn't get angry about stuff
  // happening after test is over
  await screen.findByRole("spinbutton", { name: "Chocolate:" });
  await screen.findByRole("checkbox", { name: "M&Ms" });
});
