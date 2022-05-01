import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("display scoops image from server", async () => {
  render(<Options optionType="scoops" />);

  //To find images
  const scoopImgs = await screen.findAllByRole("img", { name: /scoop$/i }); //Ending w scoop
  expect(scoopImgs).toHaveLength(2); //Mock server returns 2 objects

  //To confirm alt text
  const altText = scoopImgs.map((item) => item.alt);
  expect(altText).toEqual(["Chocolate scoop", "Salted Caramel scoop"]); //.toBe used for numbers or strings. Similarly, .toEqual used for objects or arrays
});

test("display toppings image from server", async () => {
  render(<Options optionType="toppings" />);

  //To find images
  const toppingImgs = await screen.findAllByRole("img", { name: /topping$/i }); //Ending w topping
  expect(toppingImgs).toHaveLength(3); //Mock server returns 3 objects

  //To confirm alt text
  const altText = toppingImgs.map((item) => item.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Gummy Bears topping",
  ]);
});

test("No scoop subtotal update for invalid scoop count", async () => {
  render(<Options optionType="scoops" />);

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate:",
  });

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "-1");

  const scoopsSubtotal = screen.getByText("Scoops total: €0.00");
  expect(scoopsSubtotal).toBeInTheDocument();
});
