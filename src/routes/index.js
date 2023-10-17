const routes = require("express").Router();

const usersRoutes = require("../routes/usersRoutes");
const dishesRoutes = require("../routes/dishesRoutes");
const favoritesRoutes = require("../routes/favoritesRoutes");
const cartRoutes = require("../routes/cartRoutes");
const sessionsRoutes = require("../routes/sessionsRoutes");

routes.use("/users", usersRoutes);
routes.use("/dishes", dishesRoutes);
routes.use("/favorites", favoritesRoutes);
routes.use("/cart", cartRoutes);
routes.use("/sessions", sessionsRoutes);

module.exports = routes;
