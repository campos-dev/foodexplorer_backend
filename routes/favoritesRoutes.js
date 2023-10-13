const favoritesRoutes = require("express").Router();

const FavoritesControllers = require("../src/controllers/favoritesControllers");
const favoritesControllers = new FavoritesControllers();

favoritesRoutes.post("/:user_id/:dishes_id", favoritesControllers.create);
favoritesRoutes.delete("/:user_id/:dishes_id", favoritesControllers.delete);

module.exports = favoritesRoutes;
