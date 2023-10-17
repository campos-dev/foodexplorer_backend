const dishesRoutes = require("express").Router();
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const upload = multer(uploadConfig.MULTER);

const DishesControllers = require("../controllers/dishesControllers");
const dishesControllers = new DishesControllers();
const DishAvatarControllers = require("../controllers/dishAvatarControllers");
const dishAvatarControllers = new DishAvatarControllers();

dishesRoutes.post("/", dishesControllers.create);
dishesRoutes.put("/:id", dishesControllers.update);
dishesRoutes.patch(
  "/avatar/:id",
  upload.single("avatar"),
  dishAvatarControllers.update
);
dishesRoutes.get("/:id", dishesControllers.show);
dishesRoutes.get("/", dishesControllers.index);
dishesRoutes.delete("/:id", dishesControllers.delete);

module.exports = dishesRoutes;
