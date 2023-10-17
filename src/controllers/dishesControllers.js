const AppError = require("../../utils/AppError");
const knex = require("../database/knex");

class DishesControllers {
  async create(req, res) {
    const { avatar, title, category, description, price, tags } = req.body;
    let isActive = req.body.isActive;

    isActive = "1";

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
      isActive,
    });

    const tagsInserted = tags.map((tag) => {
      return {
        dishes_id,
        name: tag,
      };
    });

    await knex("tags").insert(tagsInserted);

    return res.json();
  }

  async show(req, res) {
    const { id } = req.params;

    const dish = await knex("dishes").where({ id }).first();
    const tags = await knex("tags").where({ dishes_id: id }).orderBy("name");

    if (dish.isActive === "0") {
      throw new AppError("This product was removed");
    }

    return res.json({ ...dish, tags });
  }

  async delete(req, res) {
    const { id } = req.params;
    const dish = await knex("dishes").where({ id }).first();

    if (dish.isActive === "0") {
      throw new AppError("This product was removed");
    }

    await knex("dishes").where({ id }).update({ isActive: "0" });

    return res.json();
  }

  async index(req, res) {
    const { title, category, tags } = req.query;

    let dishes;

    if (tags) {
      const filterTags = tags.split(",").map((tag) => tag.trim());

      dishes = await knex("tags")
        .select(["dishes.id", "dishes.title"])
        .whereLike("dishes.title", `%${title}%`)
        .whereLike("dishes.category", `${category}`)
        .whereIn("name", filterTags)
        .innerJoin("dishes", "dishes.id", "tags.dishes_id")
        .whereNot("dishes.isActive", "0") // Add this line
        .orderBy("dishes.title");
    } else {
      dishes = await knex("dishes")
        .whereLike("title", `%${title}%`)
        .whereLike("category", `${category}`)
        .whereNot("isActive", "0") // Add this line
        .orderBy("title");
    }

    const allTags = await knex("tags");
    const dishesWithTags = dishes.map((dish) => {
      const dishTags = allTags.filter((tag) => dish.id === tag.dishes_id);
      return { ...dish, tags: dishTags };
    });

    return res.json(dishesWithTags);
  }
}

module.exports = DishesControllers;
