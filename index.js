const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

// Middleware and app configuration code here

// Mount the user routes
app.use('/users', userRoutes);

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
