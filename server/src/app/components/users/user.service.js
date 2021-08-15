const User = require('../shared/models/user');

const getUserById = (userId) => {
    return User.getUserById(userId);
};

const getUserByCredentials = (email, password) => {
    return User.getUserByCredentials(email, password);
};

module.exports = {
    getUserById,
    getUserByCredentials
};