const favoritesRoutes = require("express").Router();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const FavoritesControllers = require("../controllers/favoritesControllers");
const favoritesControllers = new FavoritesControllers();

favoritesRoutes.use(ensureAuthenticated);

favoritesRoutes.post("/:dishes_id", favoritesControllers.create);
favoritesRoutes.delete("/:dishes_id", favoritesControllers.delete);

module.exports = favoritesRoutes;
