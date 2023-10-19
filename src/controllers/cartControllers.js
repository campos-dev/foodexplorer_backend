const AppError = require("../../utils/AppError");
const knex = require("knex")(require("../../knexfile")["development"]);

class CartControllers {
  async create(req, res) {
    const user_id = req.user.id;
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
      status: "pending",
    });

    return res.json();
  }

  async show(req, res) {
    const { id } = req.params;
    const { role } = req.user;

    let user_id;
    if (role === "admin") {
      user_id = req.body.user_id;
    } else {
      user_id = req.user.id;
    }

    const user_order = await knex("userCart").where({ user_id, id }).first();

    return res.json(user_order);
  }

  async delete(req, res) {
    const { id } = req.params;
    const { role } = req.user;

    let user_id;
    if (role === "admin") {
      user_id = req.body.user_id;
    } else {
      user_id = req.user.id;
    }

    const order_id = await knex("userCart").where({ user_id, id }).first();

    if (order_id.status !== "pending") {
      throw new AppError(
        "Order was already processed. It's not possible to remove it anymore"
      );
    }
    await knex("userCart").where({ user_id, id }).delete();
    return res.json();
  }

  async index(req, res) {
    const { role } = req.user;

    let user_id;
    if (role === "admin") {
      user_id = req.body.user_id;
    } else {
      user_id = req.user.id;
    }

    const orders_historic = await knex("userCart").where({ user_id });

    return res.json(orders_historic);
  }

  async update(req, res) {
    const { id } = req.params;
    const { dishes_id, amount, status } = req.body;

    const order_id = await knex("userCart").where({ id }).first();

    if (order_id.status === "pending") {
      const dish = await knex("dishes").where({ id: dishes_id }).first();

      const updated_order = await knex("userCart")
        .where({ id })
        .first()
        .update({ dishes_id, amount, status, title: dish.title });

      return res.json(updated_order);
    } else {
      const updated_order = await knex("userCart")
        .where({ id })
        .first()
        .update({ status });

      return res.json(updated_order);
    }
  }
}

module.exports = CartControllers;
