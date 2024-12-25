const { connect } = require('mongoose');
const Url = require('../models/Url');
const dotenv = require('dotenv');
dotenv.config();
const getAnalyticsByAlias = async (req, res) => {
    const alias = req.params.alias;
    try {
        const urlEntry = await Url.findOne({ shortUrl: alias });

        if (!urlEntry) {
            return res.status(404).json({ message: 'URL not found' });
        }

        res.json({
            totalClicks: urlEntry.totalClicks || 0,
            uniqueClicks: urlEntry.uniqueClicks || 0,
            clicksByDate: [],
        });

    } catch (error) {
        console.error('Error fetching analytics:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



const getTopicAnalytics = async (req, res) => {
    const topic = req.params.topic;
   
    console.log("inside the get topic analytics api")
    console.log(topic)
    try {
        const urlsInTopic = await Url.find({ topic });
        let totalClicks = 0;
        let uniqueClicksSet = new Set();
        const clicksByDate = {};
        for (const url of urlsInTopic) {
            totalClicks += url.totalClicks || 0;
            uniqueClicksSet.add(url._id.toString());
            clicksByDate[url.createdAt.toISOString().split('T')[0]] =
                (clicksByDate[url.createdAt.toISOString().split('T')[0]] || 0) + (url.totalClicks || 0);
        }

        res.json({
            totalClicks,
            uniqueClicks: uniqueClicksSet.size,
            clicksByDate: Object.entries(clicksByDate).map(([date, count]) => ({ date, count })),
            urls: urlsInTopic.map(url => ({
                shortUrl: url.shortUrl,
                totalClicks: url.totalClicks || 0,
                uniqueClicks: url.uniqueClicks || 0,
            })),
        });

    } catch (error) {
        console.error('Error fetching topic analytics:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getOverallAnalytics = async (req, res) => {
    try {
        const urlsCreated = await Url.find();
        let totalUrls = urlsCreated.length;
        let totalClicks = 0;
        const clicksByDate = {};
        for (const url of urlsCreated) {
            totalClicks += url.totalClicks || 0;
            const dateKey = url.createdAt.toISOString().split('T')[0];
            clicksByDate[dateKey] = (clicksByDate[dateKey] || 0) + (url.totalClicks || 0);
        }
        res.json({
            totalUrls,
            totalClicks,
            clicksByDate: Object.entries(clicksByDate).map(([date, count]) => ({ date, count })),
        });

    } catch (error) {
        console.error('Error fetching overall analytics:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports = {
    getTopicAnalytics,
    getOverallAnalytics,
    getAnalyticsByAlias
};