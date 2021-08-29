const User = require('../shared/models/user');

const getUserById = (userId) => {
    return User.getUserById(userId);
};

const getUserByCredentials = (email, password) => {
    return User.getUserByCredentials(email, password);
};

const updateUserById = (userId, user) => {
    return User.updateUserById(userId, user);
}

module.exports = {
    getUserById,
    getUserByCredentials,
    updateUserById
};