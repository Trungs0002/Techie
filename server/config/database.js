// Database Configuration
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Mongoose 6+ không cần những options này nữa
      // useNewUrlParser, useUnifiedTopology đã deprecated
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📁 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error(`❌ MongoDB error: ${err}`);
});

module.exports = connectDB;
