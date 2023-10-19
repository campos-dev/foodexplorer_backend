const dishesRoutes = require("express").Router();
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const upload = multer(uploadConfig.MULTER);

const DishesControllers = require("../controllers/dishesControllers");
const dishesControllers = new DishesControllers();
const DishAvatarControllers = require("../controllers/dishAvatarControllers");
const dishAvatarControllers = new DishAvatarControllers();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

dishesRoutes.post(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization("admin"),
  dishesControllers.create
);
dishesRoutes.put(
  "/:id",
  ensureAuthenticated,
  verifyUserAuthorization("admin"),
  dishesControllers.update
);
dishesRoutes.patch(
  "/avatar/:id",
  ensureAuthenticated,
  verifyUserAuthorization("admin"),
  upload.single("avatar"),
  dishAvatarControllers.update
);
dishesRoutes.delete(
  "/:id",
  ensureAuthenticated,
  verifyUserAuthorization("admin"),
  dishesControllers.delete
);

dishesRoutes.get("/:id", dishesControllers.show);
dishesRoutes.get("/", dishesControllers.index);

module.exports = dishesRoutes;
