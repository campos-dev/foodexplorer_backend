const AppError = require("../../utils/AppError");
const knex = require("../database/knex");

class CartControllers {
  async create(req, res) {
    const { user_id } = req.params;
    const { dishes_id, amount } = req.body;

    const dish = await knex("dishes").where({ id: dishes_id }).first();

    if (dish.isActive === "0") {
      throw new AppError("This product was removed");
    }

    await knex("userCart").insert({
      user_id,
      dishes_id,
      title: dish.title,
      amount,
      status: "ordered",
    });

    return res.json();
  }

  async show(req, res) {
    const { id } = req.params;

    const user_order = await knex("userCart").where({ id }).first();

    return res.json(user_order);
  }

  async delete(req, res) {
    const { user_id, id } = req.params;

    const dish = await knex("dishes").where({ id }).first();

    if (dish.isActive === "0") {
      throw new AppError("This product was removed");
    }

    const order_id = await knex("userCart").where({ user_id, id }).first();

    if (order_id.status !== "ordered") {
      throw new AppError("It's not possible to remove your order anymore");
    }
    await knex("userCart").where({ user_id }).where({ user_id, id }).delete();
    return res.json();
  }

  async index(req, res) {
    const { user_id } = req.params;

    const orders_historic = await knex("userCart").where({ user_id });

    return res.json(orders_historic);
  }
}

module.exports = CartControllers;
