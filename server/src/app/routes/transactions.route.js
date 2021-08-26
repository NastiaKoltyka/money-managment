const express = require('express');
const route = express.Router();
const passport = require('passport');


const transactionsController = require('../components/transactions/transaction.controller');

module.exports = () => {
    route.post('/income-to-saving', passport.authenticate('jwt', { session: false }), transactionsController.transferFromIncomeToSaving);
    route.post('/saving-to-expense', passport.authenticate('jwt', { session: false }), transactionsController.transferFromSavingToExpense);
    route.get('/history:userId', passport.authenticate('jwt', { session: false }), transactionsController.getUserHistory);
    return route;
}