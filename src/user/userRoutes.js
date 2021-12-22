const cors = require('cors');
const { Router } = require("express");
const { hashPassword, comparePasswords } = require("../middleware/index.js");
const { addUser, listUsers, findUser, updateUser, updatePassword, deleteUser } = require("./userController.js");
const userRouter = Router();

var corsOptions = {
    origin: 'https://serene-mccarthy-223972.netlify.app/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

userRouter.post("/user", cors(), hashPassword, addUser);
userRouter.get("/user", cors(), listUsers);
userRouter.post("/login", cors(), findUser, comparePasswords);
userRouter.put("/updatePassword", cors(), findUser, comparePasswords, hashPassword, updatePassword);
userRouter.put("/user", cors(), updateUser)
userRouter.delete("/user", cors(), deleteUser);

module.exports = userRouter;