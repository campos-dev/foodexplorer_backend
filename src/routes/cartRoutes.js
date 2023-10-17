const cartRoutes = require("express").Router();

const CartControllers = require("../controllers/cartControllers");
const cartControllers = new CartControllers();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

cartRoutes.use(ensureAuthenticated);

cartRoutes.post("/", cartControllers.create);
cartRoutes.get("/:id", cartControllers.show);
cartRoutes.get("/", cartControllers.index);
cartRoutes.delete("/:id", cartControllers.delete);

module.exports = cartRoutes;
