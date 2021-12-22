const cors = require('cors');
const { Router } = require("express");
const { hashPassword, comparePasswords } = require("../middleware/index.js");
const { addUser, listUsers, findUser, updateUser, updatePassword, deleteUser } = require("./userController.js");
const userRouter = Router();

var corsOptions = {
    origin: 'https://serene-mccarthy-223972.netlify.app/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

userRouter.post("/user", cors(corsOptions), hashPassword, addUser);
userRouter.get("/user", cors(corsOptions), listUsers);
userRouter.post("/login", cors(corsOptions), findUser, comparePasswords);
userRouter.put("/updatePassword", cors(corsOptions), findUser, comparePasswords, hashPassword, updatePassword);
userRouter.put("/user", cors(corsOptions), updateUser)
userRouter.delete("/user", cors(corsOptions), deleteUser);

module.exports = userRouter;