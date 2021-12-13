const { Router } = require("express");
const { addUser, listUsers, updateUser, deleteUser } = require("./userController.js");
const userRouter = Router();

userRouter.post("/user", addUser);
userRouter.get("/user", listUsers);
userRouter.put("/user", updateUser)
userRouter.delete("/user", deleteUser);

module.exports = userRouter;