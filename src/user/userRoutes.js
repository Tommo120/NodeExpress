const { Router } = require("express");
const { hashPassword, comparePasswords } = require("../middleware/index.js");
const { addUser, listUsers, findUser, updateUser, updatePassword, deleteUser } = require("./userController.js");
const userRouter = Router();

userRouter.post("/user", hashPassword, addUser);
userRouter.get("/user", listUsers);
userRouter.post("/login", findUser, comparePasswords);
userRouter.put("/updatePassword", findUser, comparePasswords, hashPassword, updatePassword);
userRouter.put("/user", updateUser)
userRouter.delete("/user", deleteUser);

module.exports = userRouter;