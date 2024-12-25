const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    longUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    customAlias: { type: String, unique: true },
    topic: { type: String },
    userId: { type: String },
    totalClicks: { type: Number, default: 0 },
    uniqueClicks: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Url', urlSchema);