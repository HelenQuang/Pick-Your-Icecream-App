import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../mocks/server";

test("handles error for fetch API", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test("disable order btn if no scoops ordered", async () => {
  render(<OrderEntry />);

  const orderBtn = screen.getByRole("button", { name: "Place your order" });
  expect(orderBtn).toBeDisabled();

  const saltedCaramelInput = await screen.findByRole("spinbutton", {
    name: "Salted Caramel:",
  });
  userEvent.clear(saltedCaramelInput);
  userEvent.type(saltedCaramelInput, "1");
  expect(orderBtn).toBeEnabled();

  userEvent.clear(saltedCaramelInput);
  userEvent.type(saltedCaramelInput, "0");
  expect(orderBtn).toBeDisabled();
});
