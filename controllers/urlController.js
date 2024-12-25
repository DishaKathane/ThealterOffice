const Url = require('../models/Url');
const redisClient = require('../config/redisClient.js');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
dotenv.config();


const shortenUrl = async (req, res) => {
    // if (!req.user) {
    //     return res.status(401).json({ message: 'User not authenticated' });
    // }
    const { longUrl, customAlias, topic } = req.body;
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!urlRegex.test(longUrl)) {
        return res.status(400).json({ message: 'Invalid URL format' });
    }

    const shortUrl = customAlias || uuidv4();
    const newUrl = new Url({
        longUrl,
        shortUrl,
        customAlias,
        topic,
        userId: req.user ? req.user.id : uuidv4(),
    });

    try {
        await newUrl.save();
        redisClient.set(shortUrl, longUrl);

        res.status(201).json({
            shortUrl: `https://short.ly/${shortUrl}`,
            createdAt: new Date(),
        });

    } catch (error) {
        console.error('Error saving URL:', error);
        res.status(500).json({ message: 'Data Already exits' });
    }
};


const redirectUrl = async (req, res) => {
    const alias = req.params.alias;
    try {
        const urlEntry = await Url.findOne({ shortUrl: alias });
        if (!urlEntry) {
            return res.status(404).json({ message: 'URL not found' });
        }

        urlEntry.totalClicks += 1;
        urlEntry.uniqueClicks += 1;

        await urlEntry.save();

        // return res.redirect(urlEntry.longUrl);
        return res.status(200).json({ message: 'Redirecting to ' + urlEntry.longUrl });

    } catch (error) {
        console.error('Error redirecting URL:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    redirectUrl,
    shortenUrl
};