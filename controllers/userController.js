const userModel = require('../models/user');
const bcrypt = require('bcrypt');

async function getUsers(req, res) {
    try {
        const users = await userModel.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function createUser(req, res) {
    try {
        const user = req.body;
        const emailExists = await userModel.checkEmailExists(user.email);

        if (emailExists) {
            return res.status(409).json({ success: false, error: 'User email is already exist' });
        }

        const phoneNumberExists = await userModel.checkPhoneNumberExists(user.phone_number);

        if (phoneNumberExists) {
            return res.status(409).json({ success: false, error: 'Phone number is already exist' });
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        const newUser = {
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,
            password: hashedPassword
        };

        const result = await userModel.createUser(newUser);
        return res.json({ success: true, message: 'User created successfully', userId: result.insertedId });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

module.exports = {
    getUsers,
    createUser
};
