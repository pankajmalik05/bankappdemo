const Router = require("express").Router();

Router.use("/auth", require("../API/auth"));

module.exports = Router;
