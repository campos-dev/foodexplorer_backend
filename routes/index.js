const routes = require("express").Router();

const usersRoutes = require("../routes/usersRoutes");
const dishesRoutes = require("../routes/dishesRoutes");
const favoritesRoutes = require("../routes/favoritesRoutes");

routes.use("/users", usersRoutes);
routes.use("/dishes", dishesRoutes);
routes.use("/favorites", favoritesRoutes);

module.exports = routes;
