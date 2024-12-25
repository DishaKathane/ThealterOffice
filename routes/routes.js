const express = require('express');
const router = express.Router();
const { register, login, authenticateJWT,protectRoute } = require('../controllers/authController.js');
const { shortenUrl, redirectUrl } = require('../controllers/urlController.js');
const {
    getAnalyticsByAlias,
    getTopicAnalytics,
    getOverallAnalytics
} = require('../controllers/analyticsController');
const rateLimiter = require('../rateLimiter/rateLimiter.js');


// router.post('/auth/google-signin', googleSignIn);
router.post('/thealteroffice/register', register);
router.post('/thealteroffice/login', login);
router.get('/thealteroffice/protected-route', authenticateJWT,protectRoute );

router.post('/api/shorten', authenticateJWT, rateLimiter, shortenUrl);
router.get('/api/shorten/:alias', authenticateJWT, redirectUrl);

router.get('/api/analytics/overall', authenticateJWT, getOverallAnalytics);
router.get('/api/analytics/:alias', authenticateJWT, getAnalyticsByAlias);
router.get('/api/analytics/topic/:topic', authenticateJWT, getTopicAnalytics);


module.exports = router;
