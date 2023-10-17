const AppError = require("../../utils/AppError");
const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class DishAvatarControllers {
  async update(req, res) {
    const { id } = req.params;
    const avatarFilename = req.file.filename;

    const diskStorage = new DiskStorage();

    const dish = await knex("dishes").where({ id }).first();

    if (!dish) {
      throw new AppError("Dish was not found", 401);
    }

    if (dish.avatar) {
      await diskStorage.deleteFile(dish.avatar);
    }

    const filename = await diskStorage.saveFile(avatarFilename);
    dish.avatar = filename;

    await knex("dishes").update(dish).where({ id });

    return res.json(dish);
  }
}
module.exports = DishAvatarControllers;
