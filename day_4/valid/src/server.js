const express = require("express");
const connect = require("./config/db.js");
const userController = require("./controller/user.controller");
const app = express();

app.use(express.json());

app.use("/users", userController);

app.listen(2349, async () => {
  await connect();
  console.log("listening to port 2349");
});
