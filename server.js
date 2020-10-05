const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");

const dbConn = require("./config/db").mongodbOnline;
mongoose.connect(dbConn, () => {
  console.log(`Mongodb Connected`);
  app.use("/API", require("./routes"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
