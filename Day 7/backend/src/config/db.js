const mongoose = require('mongoose');

/**
 * Establishes connection to MongoDB database via Mongoose.
 * Automatically falls back to MongoMemoryServer if local MongoDB daemon is not running.
 * @returns {Promise<typeof mongoose>}
 */
const connectDB = async () => {
  const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hisabdo_day7_fullstack_db';
  try {
    const conn = await mongoose.connect(connStr, { serverSelectionTimeoutMS: 2500 });
    console.log(`✅ MongoDB Connected: ${conn.connection.host} / ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.log(`⚠️ Local MongoDB service not detected (${error.message}).`);
    console.log(`🚀 Booting In-Memory MongoDB Server automatically...`);

    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const conn = await mongoose.connect(mongoServer.getUri());
      console.log(`✅ In-Memory MongoDB Server Active & Connected!`);

      // Seed initial sample student data if database is empty
      const Student = require('../models/Student');
      const count = await Student.countDocuments();
      if (count === 0) {
        await Student.create([
          { name: 'Muhammad Ali', email: 'ali@example.com', course: 'Computer Science', marks: 88 },
          { name: 'Ayesha Khan', email: 'ayesha@example.com', course: 'Software Engineering', marks: 94 },
          { name: 'Usman Raza', email: 'usman@example.com', course: 'Cyber Security', marks: 92 },
          { name: 'Fatima Ahmed', email: 'fatima@example.com', course: 'Data Science', marks: 96 }
        ]);
        console.log(`🌱 Seeded initial student records into database.`);
      }

      return conn;
    } catch (memErr) {
      console.error(`❌ Database Connection Error: ${memErr.message}`);
      if (process.env.NODE_ENV !== 'test') {
        process.exit(1);
      }
      throw memErr;
    }
  }
};

module.exports = connectDB;
