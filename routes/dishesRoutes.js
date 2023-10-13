const dishesRoutes = require("express").Router();

const DishesControllers = require("../src/controllers/dishesControllers");
const dishesControllers = new DishesControllers();

dishesRoutes.post("/", dishesControllers.create);
dishesRoutes.get("/:id", dishesControllers.show);

module.exports = dishesRoutes;
