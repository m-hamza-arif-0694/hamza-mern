const mongoose = require('mongoose');

/**
 * Establishes connection to MongoDB database via Mongoose
 * @returns {Promise<typeof mongoose>}
 */
const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hisabdo_student_db';
    const conn = await mongoose.connect(connStr);
    console.log(`✅ MongoDB Connected: ${conn.connection.host} / ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // If not running in test mode, exit process on failure
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
    throw error;
  }
};

module.exports = connectDB;
