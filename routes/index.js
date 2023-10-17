const routes = require("express").Router();

const usersRoutes = require("../routes/usersRoutes");
const dishesRoutes = require("../routes/dishesRoutes");
const favoritesRoutes = require("../routes/favoritesRoutes");
const cartRoutes = require("../routes/cartRoutes");

routes.use("/users", usersRoutes);
routes.use("/dishes", dishesRoutes);
routes.use("/favorites", favoritesRoutes);
routes.use("/cart", cartRoutes);

module.exports = routes;
