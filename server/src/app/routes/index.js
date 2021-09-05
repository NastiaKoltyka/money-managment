const Router = require('express').Router;

const users = require('./users.route');
const auth = require('./auth.route');
const images = require('./images.route');
const transactions = require('./transactions.route');
const statistics = require('./statistics.route');

module.exports = () => {
    const routing = Router();
    routing.use('/users', users());
    routing.use('/auth', auth());
    routing.use('/images', images());
    routing.use('/transactions', transactions());
    routing.use('/statistics', statistics());

    return routing;
}