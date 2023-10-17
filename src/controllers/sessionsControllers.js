const knex = require("../database/knex");
const AppError = require("../../utils/AppError");
const { compare } = require("bcryptjs");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionsControllers {
  async create(req, res) {
    const { email, password } = req.body;
    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("User or password are not correct", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("User or password are not correct", 401);
    }

    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return res.json({ user, token });
  }
}

module.exports = SessionsControllers;
