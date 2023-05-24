const connectToDB = require('../db');

async function getUsers() {
    const db = await connectToDB();
    return db.collection('users').find().toArray();
}

async function createUser(user) {
    const db = await connectToDB();
    return db.collection('users').insertOne(user);
}

async function checkEmailExists(email) {
    const db = await connectToDB();
    return db.collection('users').findOne({ email });
}

async function checkPhoneNumberExists(phone_number) {
    const db = await connectToDB();
    return db.collection('users').findOne({ phone_number });
}

module.exports = {
    getUsers,
    createUser,
    checkEmailExists,
    checkPhoneNumberExists
};
