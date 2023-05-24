const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function getUsers(req, res) {
    try {
        const users = await userModel.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
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

async function deleteUser(req, res) {
    try {
        const userId = req.params.id;
        const deletedCount = await userModel.deleteUser(userId);

        if (deletedCount === 0) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        return res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
}


async function generateAuthToken(userId) {
    const token = jwt.sign({ userId }, 'node-basics-project-secret-key', { expiresIn: '1h' });
    return token;
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }

        const token = await generateAuthToken(user._id.toString());

        delete user.password;
        return res.json({ success: true, token, user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
}


async function updateUser(req, res) {
    try {
        const userId = req.params.id;
        const user = req.body;

        let updatedData = user;

        const emailTaken = await userModel.findUserByEmailAndIdNotEqual(user.email, userId);
        if (emailTaken) {
            return res.status(409).json({ success: false, error: 'User email is already taken by another user' });
        }

        const phoneTaken = await userModel.findUserByPhoneAndIdNotEqual(user.phone_number, userId);
        if (phoneTaken) {
            return res.status(409).json({ success: false, error: 'Mobile number is already taken by another user' });
        }

        if (user.password) {
            const hashedPassword = await bcrypt.hash(user.password, 10);

            updatedData = {
                name: user.name,
                email: user.email,
                phone_number: user.phone_number,
                password: hashedPassword
            };
        }

        const modifiedCount = await userModel.updateUser(userId, updatedData);

        if (modifiedCount === 0) {
            return res.status(404).json({ success: false, error: 'User not found or already updated' });
        }

        return res.json({ success: true, message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
}


module.exports = {
    getUsers,
    createUser,
    deleteUser,
    loginUser,
    updateUser
};
