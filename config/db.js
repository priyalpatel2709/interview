const mongoose = require("mongoose");
const colors = require("colors");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected:`.underline.bgGreen);
  } catch (error) {
    console.log("File: db.js", "Line 13:", error);
    logger.error(`Error Connect To MongoDb: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
