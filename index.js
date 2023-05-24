const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const apiRoutes = require('./routes/apiRoutes');

// Middleware and app configuration code here

app.use(bodyParser.json());
app.use('/api', apiRoutes);

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
