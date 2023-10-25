const knex = require("knex")(require("../../knexfile")["development"]);
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

    const token = sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn,
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 60 * 60 * 1000,
    });

    delete user.password;

    return res.json({ user });
  }
}

module.exports = SessionsControllers;
