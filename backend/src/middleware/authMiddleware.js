const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_production');
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};

// Optional auth - extracts user if token present, but doesn't block
const optionalAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
        try {
            const user = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_production');
            req.user = user;
        } catch (error) {
            // Token invalid, but we don't block - just proceed without user
            req.user = null;
        }
    }
    next();
};

const requireSeller = (req, res, next) => {
    if (req.user.role !== 'seller' && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Seller access required' });
    }
    next();
};

module.exports = {
    authenticateToken,
    optionalAuth,
    requireSeller
};
