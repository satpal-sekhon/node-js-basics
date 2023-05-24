const userModel = require('../models/user');

async function getUsers(req, res) {
    try {
        const users = await userModel.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getUsers,
    // Other controller functions here
};
