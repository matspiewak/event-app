const mongoose = require("mongoose");

exports.dbConnection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://mspiewak:${process.env.DB_PASS_PASSWORD}@cluster0.rczr8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );
  } catch (error) {
    console.log(error);
  }
  mongoose.connection.on("error", (err) => {
    console.log(err.message);
  });
};