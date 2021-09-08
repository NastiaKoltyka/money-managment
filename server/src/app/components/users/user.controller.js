const userService = require('./user.service');

const getUser = (req, res) => {
    return userService.getUserById(req.params.id)
        .then(user => {
            return res.status(200).json(user);
        })
        .catch(error => {
            return res.status(error.code).json({
                code: error.code,
                description: error.description
            })
        });
};

const updateUser = (req, res) => {
    return userService.updateUserById(req.params.id, req.body)
        .then(r => {
            return res.status(200).json();
        })
        .catch(error => {
            return res.status(error.code).json({
                code: error.code,
                description: error.description
            })
        });
};

module.exports = {
    getUser,
    updateUser
};