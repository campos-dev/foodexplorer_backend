const sessionsRouter = require("express").Router();

const SessionsControllers = require("../controllers/sessionsControllers");
const sessionsControllers = new SessionsControllers();

sessionsRouter.post("/", sessionsControllers.create);

module.exports = sessionsRouter;
