const express = require("express");
const app = express();
app.use(express.json());

const routes = require("../routes");

app.use(routes);

const PORT = 3333;

app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
