const AppError = require("../../utils/AppError");
const knex = require("knex")(require("../../knexfile")["development"]);

class DishesControllers {
  async create(req, res) {
    const { avatar, title, category, description, price, tags } = req.body;
    let isActive = req.body.isActive;

    isActive = "1";

    if (!title || !category || !price) {
      throw new AppError("Dish name, description, price are mandatory");
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

  async update(req, res) {
    const { id } = req.params;
    const { avatar, title, category, description, price, tags } = req.body;

    await knex("dishes")
      .update({ avatar, title, category, description, price })
      .where({ id });

    const dish = await knex("dishes").where({ id }).first();

    await knex("tags").where({ dishes_id: id }).del();

    for (let tag of tags) {
      const tagName = typeof tag === "object" ? tag.name : tag;
      await knex("tags").insert({ name: tagName, dishes_id: id });
    }

    const updatedTags = await knex("tags").where({ dishes_id: id });

    return res.json({ dish, updatedTags });
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
    const { search, category } = req.query;

    let dishes;

    dishes = await knex("tags")
      .distinct(
        "dishes.id",
        "dishes.title",
        "dishes.avatar",
        "dishes.description",
        "dishes.price"
      )
      .where(function () {
        this.whereLike("dishes.title", `${search}%`).orWhereLike(
          "name",
          `${search}%`
        );
      })
      .whereLike("dishes.category", `${category}`)
      .innerJoin("dishes", "dishes.id", "tags.dishes_id")
      .whereNot("dishes.isActive", "0")
      .orderBy("dishes.title");

    const allTags = await knex("tags");
    const dishesWithTags = dishes.map((dish) => {
      const dishTags = allTags.filter((tag) => dish.id === tag.dishes_id);
      return { ...dish, tags: dishTags };
    });

    return res.json(dishesWithTags);
  }
}

module.exports = DishesControllers;
