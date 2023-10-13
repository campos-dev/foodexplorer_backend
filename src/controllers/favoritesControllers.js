const AppError = require("../../utils/AppError");
const knex = require("../database/knex");

class FavoritesControllers {
  async create(req, res) {
    const { user_id, dishes_id } = req.params;
    const dish = await knex("dishes").where({ id: dishes_id }).first();

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

  async delete(req, res) {
    const { user_id, dishes_id } = req.params;

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
