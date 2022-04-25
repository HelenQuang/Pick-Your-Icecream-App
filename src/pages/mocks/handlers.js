import { rest } from "msw";

export const handlers = [
  // For scoop items
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "Chocolate",
          imagePath: "/public/images/chocolate.png",
        },
        {
          name: "Salted Caramel",
          imagePath: "/public/images/salted-caramel.png",
        },
      ])
    );
  }),

  //For topping items
  rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Cherries", imagePath: "/public/images/cherries.png" },
        { name: "M&Ms", imagePath: "/public/images/m-and-ms.png" },
        { name: "Gummy Bears", imagePath: "/public/images/gummi-bears.png" },
      ])
    );
  }),
];
