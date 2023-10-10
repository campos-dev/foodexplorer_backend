const AppError = require("../utils/AppError");

class UsersControllers {
  create(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new AppError("All fields are mandatories!");
    }

    res.json({ name, email, password });
  }
}

module.exports = UsersControllers;
