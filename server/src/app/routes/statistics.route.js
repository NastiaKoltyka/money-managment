const express = require('express');
const route = express.Router();
const passport = require('passport');


const statisticsController = require('../components/statistics/statistics.controller');

module.exports = () => {
    route.get('/income-distribution/:userId/:month/:year', passport.authenticate('jwt', { session: false }), statisticsController.getIncomeDistribution);
    route.get('/expense-distribution/:userId/:month/:year', passport.authenticate('jwt', { session: false }), statisticsController.getExpenseDistribution);
    return route;
}