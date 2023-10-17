const cartRoutes = require("express").Router();

const CartControllers = require("../src/controllers/cartControllers");
const cartControllers = new CartControllers();

cartRoutes.post("/:user_id", cartControllers.create);
cartRoutes.get("/:id", cartControllers.show);
cartRoutes.get("/user/:user_id", cartControllers.index);
cartRoutes.delete("/:user_id/:id", cartControllers.delete);

module.exports = cartRoutes;
