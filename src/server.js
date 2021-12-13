const express = require("express");

const app = express();
const port = 5000;

app.use("/home", express.static("public/home.html"));
app.use("/about", express.static("public/about.html"));
app.use("/contact", express.static("public/contact.html"));

app.listen(port, () => {
    console.log("Connection established");
});