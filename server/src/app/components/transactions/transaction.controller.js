const transactionService = require('./transaction.service');

const transferFromIncomeToSaving = (req, res) => {
    return transactionService.transferFromIncomeToSaving(req.body.userId, req.body.savingId, req.body.amount)
        .then(r => {
            return res.status(200).json();
        })
        .catch(error => {
            return res.status(error.code).json({
            code: error.code,
            description: error.description
        })});
};

const transferFromSavingToExpense = (req, res) => {
    return transactionService.transferFromSavingToExpense(req.body.savingId, req.body.expenseId, req.body.amount)
    .then(r => {
        return res.status(200).json();
    })
    .catch(error => {
        return res.status(error.code).json({
        code: error.code,
        description: error.description
    })});
};

const getUserHistory = (req, res) => {
    return transactionService.getUserHistory(req.params.userId)
    .then(r => {
        return res.status(200).json(r);
    })
    .catch(error => {
        return res.status(error.code).json({
        code: error.code,
        description: error.description
    })});
};

module.exports = {
    transferFromIncomeToSaving,
    transferFromSavingToExpense,
    getUserHistory
};