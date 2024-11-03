require('dotenv').config();

module.exports = {
  // Server configuration
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Database configuration
  MONGO_URI: process.env.MONGO_URI,

  // Authentication configuration
  JWT_SECRET: process.env.JWT_SECRET || 'hostel-room-secret-key',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '24h',
  BCRYPT_SALT_ROUNDS: 10,

  // Hostel configuration
  TOTAL_ROOMS: process.env.TOTAL_ROOMS || 100,
  ROOM_TYPES: ['Single', 'Double', 'Triple'],

  // API configuration
  API_VERSION: '/api/v1',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',

  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};