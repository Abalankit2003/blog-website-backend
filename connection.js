const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connection = mongoose.connect(process.env.MONGO)
.then(() => {console.log("mongodb connected!");})
.catch((err) => {console.log("Error", err)});

module.exports = connection;
