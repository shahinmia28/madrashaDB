const mongoose = require('mongoose');
require('dotenv').config();

const mongodbUrl = process.env.MONGO_DB;
const connectDB = async () => {
  try {
    await mongoose.connect(mongodbUrl);
    console.log('DB is Connected');
  } catch (error) {
    console.log('err: ', error);
  }
};

module.exports = connectDB;
