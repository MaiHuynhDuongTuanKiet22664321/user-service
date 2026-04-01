const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.post("/register", controller.register);
  app.post("/login", controller.login);
  app.get("/users", controller.findAll);
  app.get("/users/:id", controller.findOne);
  app.delete("/users/:id", controller.delete);
};