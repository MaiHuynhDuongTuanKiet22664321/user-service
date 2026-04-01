
require('dotenv').config();


module.exports = {
  secret: process.env.JWT_SECRET || "default_secret",
  jwtExpiration: parseInt(process.env.JWT_EXPIRATION) || 86400 // 24h
};