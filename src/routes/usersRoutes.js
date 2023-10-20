const usersRoutes = require("express").Router();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated.js");

const UsersControllers = require("../controllers/usersControllers");
const usersControllers = new UsersControllers();

usersRoutes.post("/", usersControllers.create);

module.exports = usersRoutes;
