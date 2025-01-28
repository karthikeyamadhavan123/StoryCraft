const jwt = require('../jwt/jwt.js');
const cookieParser = require('cookie-parser');

function tokenVerification(req, res, next) {
    try {
        let cookie_token = req.cookies?.['register'] || req.cookies?.['login']; // Add this debug log

        if (!cookie_token) {
            return res.status(401).json({
                success: false,
                message: 'No authentication token found in cookies'
            });
        }

        const secret = process.env.SECRET_KEY;
        const decoded = jwt.verifyToken(cookie_token, secret);

        // Add this debug log

        req.userId = decoded;
        next();
    } catch (error) {
        console.error('Token Verification Error:', error);
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
            error: error.message
        });
    }
}

module.exports = tokenVerification;