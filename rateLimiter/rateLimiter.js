const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs:
        60 * 60 * 1000,
    max:
        10,
    message:
        'Too many requests from this IP address',
});

module.exports =
    limiter;
