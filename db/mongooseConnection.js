const mongoose = require("mongoose");

exports.connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      dbName: process.env.MONGODB_COLECTION,
      connectTimeoutMS: process.env.MONGODB_CONNECTION_TIMEOUT,
    });
    console.log("Database bağlantısı başarılı!");
  } catch (error) {
    console.log("DB connect hatası:", error.message);
    throw new Error(error.message);
  }
};