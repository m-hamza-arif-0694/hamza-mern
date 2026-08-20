import mongoose from 'mongoose';

/**
 * Global Mongoose Connection Handler with cached connection.
 */
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hisabdo_customers_khata_db';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 2000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log('✅ MongoDB Connected successfully to:', mongooseInstance.connection.name);
      return mongooseInstance;
    }).catch((err) => {
      console.warn('⚠️ Mongoose connection note:', err.message);
      // Fallback handled via DBStore
      return null;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
  }

  return cached.conn;
}

export default connectDB;
