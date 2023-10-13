const AppError = require("../../utils/AppError");
const knex = require("../database/knex");

class DishesControllers {
  async create(req, res) {
    const { avatar, title, category, description, price, tags } = req.body;

    if (!title || !category || !price || !avatar) {
      throw new AppError(
        "Dish name, description, price and picture are mandatory"
      );
    }

    const [dishes_id] = await knex("dishes").insert({
      avatar,
      title,
      category,
      description,
      price,
    });

    const tagsInserted = tags.map((tag) => {
      return {
        dishes_id,
        name: tag,
      };
    });

    await knex("tags").insert(tagsInserted);

    res.json();
  }

  async show(req, res) {
    const { id } = req.params;

    const dish = await knex("dishes").where({ id }).first();
    const tags = await knex("tags").where({ dishes_id: id }).orderBy("name");

    return res.json({ ...dish, tags });
  }
}

module.exports = DishesControllers;
