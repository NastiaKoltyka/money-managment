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
            return {
                category: cat.category,
                percent: getCategoryTotal(savings, r => r.savingId == cat.id) / total * 100,
                total: getCategoryTotal(savings, r => r.savingId == cat.id)
            };
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
                return {
                    category: cat.category,
                    percent: getCategoryTotal(expenses, r => r.expenseId == cat.id) / total * 100,
                    total: getCategoryTotal(expenses, r => r.expenseId == cat.id)
                };
            });
        });
    });
};
const getCategoryTotal = (statistics, filter) => {
    return statistics.filter(filter).map(r => r.amount).reduce((a, b) => a + b, 0);
}


module.exports = {
    getIncomeDistribution,
    getExpenseDistribution
};