const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    // Extract the token from the request headers, query parameters, or cookies
    let token = req.headers.authorization;

    // Check if the token exists
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        // Verify and decode the token
        token = token.split(' ')[1];

        const decoded = jwt.verify(token, 'node-basics-project-secret-key');
        console.log('decoded', decoded)
        // Attach the user ID to the request object
        req.userId = decoded.userId;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token.' });
    }
}

module.exports = authMiddleware;
