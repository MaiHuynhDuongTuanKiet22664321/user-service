const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

require("./routes/user.routes")(app);

app.get("/", (req, res) => {
  res.json({ message: "User Service connected to MariaDB 172.16.42.126" });
});

module.exports = app;