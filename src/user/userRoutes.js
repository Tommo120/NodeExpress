const { Router } = require("express");
const { hashPassword } = require("../middleware/index.js");
const { addUser, listUsers, logIn, updateUser, deleteUser } = require("./userController.js");
const userRouter = Router();

userRouter.post("/user", hashPassword, addUser);
userRouter.get("/user", listUsers);
userRouter.get("/login", logIn);
userRouter.put("/user", updateUser)
userRouter.delete("/user", deleteUser);

module.exports = userRouter;