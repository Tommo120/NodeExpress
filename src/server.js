require("./db/connection.js")
const express = require("express");
const cors = require("cors");
const userRouter = require("./user/userRoutes.js");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use(userRouter);

app.listen(port, () => {
    console.log("Connection established");
});