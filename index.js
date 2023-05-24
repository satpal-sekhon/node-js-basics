const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/userRoutes');

// Middleware and app configuration code here

app.use(bodyParser.json());
app.use('/api/users', userRoutes);

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
