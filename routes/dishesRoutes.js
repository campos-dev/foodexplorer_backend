const dishesRoutes = require("express").Router();

const DishesControllers = require("../src/controllers/dishesControllers");
const dishesControllers = new DishesControllers();

dishesRoutes.post("/", dishesControllers.create);
dishesRoutes.put("/:id", dishesControllers.update);
dishesRoutes.get("/:id", dishesControllers.show);
dishesRoutes.get("/", dishesControllers.index);
dishesRoutes.delete("/:id", dishesControllers.delete);

module.exports = dishesRoutes;
