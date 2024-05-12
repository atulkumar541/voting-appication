const mongoose = require("mongoose");
require("dotenv").config();
//Mongoose connection
mongoose.connect(process.env.LOCAL_DB);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected to Local database!");
});
db.on("error", (err) => {
  console.log("Error in database:", err);
});
db.on("disconnected", () => {
  console.log("Database Disconnected!");
});

module.exports = db;
