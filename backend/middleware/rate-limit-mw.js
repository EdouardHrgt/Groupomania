const rateLimit = require('express-rate-limit');
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15mins
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = apiLimiter;
