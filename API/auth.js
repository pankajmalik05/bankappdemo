const MyUserController = require("../Controller/userController");

const Router = require("express").Router();

Router.post("/signup", (req, res) => {
  const { user } = req.body;
  MyUserController.createNewUser(user)
    .then((newUser) => {
      return res.json({ user: newUser, success: true }).status(200);
    })
    .catch((error) => {
      return res.json({ ...error, success: false }).status(500);
    });
});

Router.post("/login", (req, res) => {
  const { user } = req.body;
  console.log("TEST 01, logging");
  MyUserController.authenticateUser(user)
    .then((aUser) => {
      return res
        .json({ msg: "User Logged In", user: aUser, success: true })
        .status(200);
    })
    .catch((err) => {
      return res.json({ ...err, success: false }).status(500);
    });
});

Router.post("/update-user", (req, res) => {
  const { user } = req.body;
  MyUserController.updateUser(user)
    .then((uUser) => {
      return res
        .json({ msg: "user updated", user: uUser, success: true })
        .status(200);
    })
    .catch((err) => {
      return res.json({ ...err, success: false }).status(500);
    });
});
module.exports = Router;
