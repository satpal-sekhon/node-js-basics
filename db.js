const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/node-basics';

async function connectToDB() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db(); // Return the database connection
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        throw error;
    }
}

module.exports = connectToDB;
