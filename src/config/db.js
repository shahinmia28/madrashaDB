const mongoose = require('mongoose');
require('dotenv').config();
const mongoDBURL = process.env.MONGODB_ATLAS_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDBURL);
    console.log('DB is Connected');
  } catch (error) {
    console.log('err: ', error);
  }
};

module.exports = connectDB;
