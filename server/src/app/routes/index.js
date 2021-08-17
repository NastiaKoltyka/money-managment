const Router = require('express').Router;

const users = require('./users.route');
const auth = require('./auth.route');
const images = require('./images.route');

module.exports = () => {
    const routing = Router();
    routing.use('/users', users());
    routing.use('/auth', auth());
    routing.use('/images', images());

    return routing;
}