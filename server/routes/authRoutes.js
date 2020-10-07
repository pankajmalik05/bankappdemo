const Router = require("express").Router();

Router.get("/", (req, res) => {
  return res.json({ msg: "Auth Module, BANK SERVER" }).status(200);
});

module.exports = Router;
