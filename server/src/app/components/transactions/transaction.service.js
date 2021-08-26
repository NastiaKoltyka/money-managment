const User = require('../shared/models/user');
const Expense = require('../shared/models/expense');
const Saving = require('../shared/models/saving');
const History = require('../shared/models/history');

const transferFromIncomeToSaving = (userId, savingId, amount) => {
    return User.getUserById(userId).then(user => {
        if (user.income < amount) {
            return Promise.reject({
                code: 400,
                description: `You don't have enough money`
            })
        }

        user.income -= amount;
        return User.updateUserById(userId, user).then(res => {
            return Saving.getSavingById(savingId).then(saving => {
                saving.balance += amount;
                return Saving.updateSavingById(savingId, saving).then(r => {
                    return History.insertHistory(userId, null, savingId, amount, new Date());
                });
            });
        });
    });
};

const transferFromSavingToExpense = (savingId, expenseId, amount) => {
    return Saving.getSavingById(savingId).then(saving => {
        if (saving.balance < amount) {
            return Promise.reject({
                code: 400,
                description: `You don't have enough money`
            })
        }

        saving.balance -= amount;
        return Saving.updateSavingById(savingId, saving).then(res => {
            return Expense.getExpenseById(expenseId).then(expense => {
                expense.balance += amount;
                return Expense.updateExpenseById(expenseId, expense).then(res => {
                    return User.getUserById(expense.userId).then(user => {
                        user.balance -= amount;
                        return User.updateUserById(user.id, user).then(r => {
                            return History.insertHistory(user.id, expenseId, savingId, amount, new Date());
                        });
                    })
                })
            });

        });
    });
};

const getUserHistory = (userId) => {
    return History.getHistoryByUserId(userId);
};

module.exports = {
    transferFromIncomeToSaving,
    transferFromSavingToExpense,
    getUserHistory
};