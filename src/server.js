require("express-async-errors");
const AppError = require("../utils/AppError");
const uploadConfig = require("./configs/upload");

const cors = require("cors");
const express = require("express");
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

const routes = require("./routes");

app.use(routes);

app.use((req, res, next) => {
  if (req.session && req.session.expires < Date.now()) {
    res.status(401).send("Session expired");
  } else {
    next();
  }
});

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ status: "error", message: error.message });
  }
  console.error(error);

  return res
    .status(500)
    .json({ status: "error", message: "Internal server error" });
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
