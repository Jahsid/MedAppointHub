const mongoose = require("mongoose");
require("dotenv").config();

module.exports = {
  dbconnect: () => {
    mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database connected successfully");
      })
      .catch((err) => {
        console.error("Error connecting to database:", err);
      });
  },
};
