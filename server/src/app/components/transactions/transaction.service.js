const User = require('../shared/models/user');
const Expense = require('../shared/models/expense');
const Saving = require('../shared/models/saving');

const transferFromIncomeToSaving = (userId, savingId, amount) => {
    return User.getUserById(userId).then(user => {
        if (user.income < amount){
            return Promise.reject({
                code: 400,
                description: `You don't have enough money`
              })
        }

        user.income -= amount;
        return User.updateUserById(userId, user).then(res => {
            return Saving.getSavingById(savingId).then(saving => {
                saving.balance += amount;
                return Saving.updateSavingById(savingId, saving);
            });
        });
    });
};

const transferFromSavingToExpense = (savingId, expenseId, amount) => {
    return Saving.getSavingById(savingId).then(saving => {
        if (saving.balance < amount){
            return Promise.reject({
                code: 400,
                description: `You don't have enough money`
              })
        }

        saving.balance -= amount;
        return Saving.updateSavingById(savingId, saving).then(res => {
            return Expense.getExpenseById(expenseId).then(expense => {
                expense.balance += amount;
                return Expense.updateExpenseById(expenseId, expense);
            });
        });
    });
};

module.exports = {
    transferFromIncomeToSaving,
    transferFromSavingToExpense
};