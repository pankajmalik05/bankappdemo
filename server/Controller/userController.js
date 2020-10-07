const { Users } = require("../modals");

class UserController {
  constructor() {
    this.checkIfExist = ({ userId }) => {
      return new Promise((resolve, reject) => {
        Users.findOne({ userId })
          .then((oUser) => {
            if (oUser) {
              resolve(oUser);
            } else {
              reject({ error: { message: "Invalid User ID" } });
            }
          })
          .catch((err) => {
            reject({ error: { message: err.message } });
          });
      });
    };

    this.updateUser = (user) => {
      return new Promise((resolve, reject) => {
        this.checkIfExist(user)
          .then((oUser) => {
            oUser.lastLoggedIn = user.lastLoggedIn;
            oUser.info = user.info;
            oUser
              .save()
              .then((sUser) => {
                resolve(sUser);
              })
              .catch((err) => {
                reject({ error: { message: err.message } });
              });
          })
          .catch((error) => {
            reject(error);
          });
      });
    };

    this.authenticateUser = (user) => {
      return new Promise((resolve, reject) => {
        this.checkIfExist(user)
          .then((oUser) => {
            if (oUser.password === user.password) {
              resolve(oUser);
            } else {
              reject({ error: { message: "Invalid User Password" } });
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    };

    this.createNewUser = ({ userId, password }) => {
      return new Promise((resolve, reject) => {
        if (
          !(
            userId === "" ||
            userId === undefined ||
            password === "" ||
            password === undefined
          )
        ) {
          let user = new Users({
            userId,
            password,
          });

          this.checkIfExist({ userId, password })
            .then((oUser) => {
              reject({ error: { message: "User Already Exist" } });
            })
            .catch((err) => {
              user
                .save()
                .then((sUser) => {
                  resolve(sUser);
                })
                .catch((err) => {
                  reject({ error: { message: err.message } });
                });
            });
        } else {
          reject({ error: { message: "Invalid User Id or Password" } });
        }
      });
    };
  }
}
const MyUserController = new UserController();
module.exports = MyUserController;
