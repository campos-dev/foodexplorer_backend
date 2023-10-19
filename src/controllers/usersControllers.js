const { hash } = require("bcryptjs");
const AppError = require("../../utils/AppError");
const knex = require("knex")(require("../../knexfile")["development"]);

class UsersControllers {
  async create(req, res) {
    const { name, email, password } = req.body;

    const checkUserExists = await knex("users").where({ email }).first();

    if (checkUserExists) {
      throw new AppError("This email was already registered");
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json();
  }
}

module.exports = UsersControllers;
