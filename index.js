const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./authMiddleware');

/* Api routes */
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.get('/api/protected', authMiddleware, (req, res) => {
    const userId = req.userId;
    return res.json({ message: 'Access granted to protected route.', userId });
});


/* Error Middleware  */
app.get('*', function (req, res) {
    res.status(404).json({ error: 'Api not found' });
});



// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
