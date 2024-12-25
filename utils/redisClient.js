const redis = require('ioredis');
const client = redis.createClient({ url: process.env.REDIS_URL });

client.on('connect', function () {
    console.log('Connected to Redis...');
});

client.on('error', (err) => {
    console.log('Redis error: ', err);
});

module.exports = client;
