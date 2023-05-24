const connectToDB = require('../db');

async function getUsers() {
    const db = await connectToDB();
    return db.collection('users').find().toArray();
}

module.exports = {
    getUsers,
    // Other model functions here
};
