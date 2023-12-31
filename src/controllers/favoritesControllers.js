const AppError = require("../../utils/AppError");
const knex = require("knex")(require("../../knexfile")["development"]);

class FavoritesControllers {
  async create(req, res) {
    const user_id = req.user.id;
    const { dishes_id } = req.params;
    const dish = await knex("dishes").where({ id: dishes_id }).first();

    if (dish.isActive === "0") {
      throw new AppError("This product was removed");
    }

    if (!dish) {
      throw new AppError("Dish not found");
    }

    const existingFavorite = await knex("userFavorite")
      .where({ user_id, dishes_id })
      .first();

    if (!existingFavorite) {
      await knex("userFavorite").insert({
        user_id,
        dishes_id,
        title: dish.title,
      });
    }

    return res.json({
      message: `${dish.title} added successfully to your favorites`,
    });
  }

  async show(req, res) {
    const { user_id } = req.params;

    const existingFavorite = await knex("userFavorite").where({ user_id });

    return res.json(existingFavorite);
  }

  async delete(req, res) {
    const user_id = req.user.id;
    const { dishes_id } = req.params;
    const dish = await knex("dishes").where({ id: dishes_id }).first();

    if (dish.isActive === "0") {
      throw new AppError("This product was removed");
    }

    const existingFavorite = await knex("userFavorite")
      .where({ user_id, dishes_id })
      .first();

    if (!existingFavorite) {
      throw new AppError("Dish or user not found");
    }

    await knex("userFavorite").where({ user_id, dishes_id }).del();

    return res.json({
      message: `${existingFavorite.title} was removed from your favorites`,
    });
  }
}

module.exports = FavoritesControllers;
