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
        })});
};

module.exports = {
    getUser
};