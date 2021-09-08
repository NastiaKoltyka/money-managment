const User = require('../shared/models/user');
const Expense = require('../shared/models/expense');
const Saving = require('../shared/models/saving');
const History = require('../shared/models/history');

const getIncomeDistribution = (userId, month, year) => {
    return User.getUserById(userId).then(user => {
        return History.getHistory(userId, month, year).then(hist => {
            let savings = hist.filter(r => r.expenseId == null);
            let total = savings.map(r => r.amount).reduce((a, b) => a + b, 0);
            return user.savings.map(cat => {
                return {category: cat.category, percent: savings.filter(r => r.savingId == cat.id).map(r => r.amount).reduce((a, b) => a + b, 0) / total * 100 };
            });
        });
    });
};

const getExpenseDistribution = (userId, month, year) => {
    return User.getUserById(userId).then(user => {
        return History.getHistory(userId, month, year).then(hist => {
            let expenses = hist.filter(r => r.expenseId != null);
            let total = expenses.map(r => r.amount).reduce((a, b) => a + b, 0);
            return user.expenses.map(cat => {
                return {category: cat.category, percent: expenses.filter(r => r.expenseId == cat.id).map(r => r.amount).reduce((a, b) => a + b, 0) / total * 100 };
            });
        });
    });
};

module.exports = {
    getIncomeDistribution,
    getExpenseDistribution
};