const mongoose = require('mongoose');
const dotenv = require('dotenv').config()

// const db = process.env.onlineURI
const dboffline = process.env.offlineURI

const connectDB = async() => {
  try {
    await mongoose.connect(dboffline,
        {
            useNewUrlParser: true
        }
    );

    console.log('MongoDB is Connected...');
  } catch(err) {
    console.error(err.message)
    process.exit(1)
  }
}

module.exports = connectDB;