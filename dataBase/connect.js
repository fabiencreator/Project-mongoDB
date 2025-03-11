// importe mongoose
const mongoose = require("mongoose");

// créer une fonction async Connection a la base de donnée MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI + process.env.DB_NAME);
    console.log("dataBase Connectée");
  } catch (err) {
    console.log(err);
  }
}

console.log(process.env.MONGO_URI + process.env.DB_NAME);

// export le module connectDB
module.exports = connectDB;