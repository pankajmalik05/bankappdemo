const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userId: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  lastLoggedIn: {
    type: Date,
  },
  info: {
    osName: String,
    deviceName: String,
    macAddress: String,
    imei: String,
    location: { long: Number, latt: Number },
    publicIP: String,
  },
});

module.exports = mongoose.model("tblusers", UserSchema);
