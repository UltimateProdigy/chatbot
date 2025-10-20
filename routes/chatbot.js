const express = require("express");
const router = express.Router();

const menuItems = [
  { id: 1, name: "Pizza", price: 10 },
  { id: 2, name: "Burger", price: 8 },
  { id: 3, name: "Pasta", price: 12 },
  { id: 4, name: "Salad", price: 6 },
];

router.post("/", (req, res) => {
  const { session } = req;
  const message = req.body.message;

  if (!session.order) {
    session.order = [];
  }

  switch (message) {
    case "1":
      res.json({
        options:
          menuItems
            .map((item) => `${item.id}: ${item.name} - $${item.price}`)
            .join("\n") + "\nSelect item by number.",
      });
      break;
    case "99":
      if (session.order.length > 0) {
        session.order = [];
        res.json({ message: "Order placed. Select 1 to place a new order." });
      } else {
        res.json({ message: "No order to place. Select 1 to place an order." });
      }
      break;
    case "98":
      res.json({
        message: `Order history: ${
          session.order.length > 0
            ? session.order.join(", ")
            : "No orders placed."
        }`,
      });
      break;
    case "97":
      res.json({
        message: `Current order: ${
          session.order.length > 0
            ? session.order.join(", ")
            : "No current order."
        }`,
      });
      break;
    case "0":
      session.order = [];
      res.json({ message: "Order canceled. Select 1 to place a new order." });
      break;
    default:
      const itemId = parseInt(message);
      const item = menuItems.find((i) => i.id === itemId);
      if (item) {
        session.order.push(item.name);
        res.json({
          message: `${item.name} added to your order. Select 1 to continue or 99 to checkout.`,
        });
      } else {
        res.json({ message: "Invalid selection. Please try again." });
      }
      break;
  }
});

module.exports = router;
