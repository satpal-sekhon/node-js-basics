const connectToDB = require('../db');
const { ObjectId } = require('mongodb');

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

async function deleteUser(userId) {
    const db = await connectToDB();
    const result = await db.collection('users').deleteOne({ _id: new ObjectId(userId) });
    return result.deletedCount;
}

async function getUserByEmail(email) {
    const db = await connectToDB();
    return db.collection('users').findOne({ email });
}

async function findUserByEmailAndIdNotEqual(email, userId) {
    const db = await connectToDB();
    return db.collection('users').findOne({ email, _id: { $ne: new ObjectId(userId) } });
}

async function findUserByPhoneAndIdNotEqual(phone_number, userId) {
    const db = await connectToDB();
    return db.collection('users').findOne({ phone_number, _id: { $ne: new ObjectId(userId) } });
}

async function updateUser(userId, updatedData) {
    const db = await connectToDB();
    const result = await db.collection('users').updateOne({ _id: new ObjectId(userId) }, { $set: updatedData });
    return result.modifiedCount;
}

module.exports = {
    getUsers,
    createUser,
    checkEmailExists,
    checkPhoneNumberExists,
    deleteUser,
    getUserByEmail,
    findUserByEmailAndIdNotEqual,
    findUserByPhoneAndIdNotEqual,
    updateUser
};
