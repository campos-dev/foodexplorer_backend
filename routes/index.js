const routes = require("express").Router();

const usersRoutes = require("../routes/usersRoutes");

routes.use("/users", usersRoutes);

module.exports = routes;
