const usersRoutes = require("express").Router();

const UsersControllers = require("../src/controllers/usersControllers");
const usersControllers = new UsersControllers();

usersRoutes.post("/", usersControllers.create);

module.exports = usersRoutes;
