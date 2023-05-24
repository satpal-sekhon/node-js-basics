const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./authMiddleware');


app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.get('/api/protected', authMiddleware, (req, res) => {
    const userId = req.userId;
    return res.json({ message: 'Access granted to protected route.', userId });
});


// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
