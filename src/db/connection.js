require("dotenv").config();
const mongoose = require("mongoose");

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URI);
        console.log("Connection established");
    } catch (error) {
        console.log(error);
    }
};

connection();