const mysql = require('mysql2');
const config = require('../../../../config/app');

const getConnection = () => {
    const connection = mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.user,
        database: 'moneyManagement',
        password: config.password
    }).promise()

    return Promise.resolve(connection);
}

const getExpensesByUserId = (userId) => {
    return getConnection()
        .then(connection => {
            return connection.query("SELECT id, category, picture, balance FROM expenses WHERE user_id=?", userId)
                .then(result => {
                    connection.close();
                    return result[0].map(row => {
                        return {
                            id: row.id,
                            category: row.category,
                            picture: row.picture,
                            balance: row.balance
                        }
                    });
                });
        })
        .catch(err => {
            return Promise.reject({
                code: 500,
                description: `Error getting expenses by user id from the database. ${err.message}`
            });
        });
}

const getExpenseById = (id) => {
    return getConnection()
        .then(connection => {
            return connection.query("SELECT id, category, picture, balance FROM expenses WHERE id=?", id)
                .then(result => {
                    connection.close();
                    let row = result[0][0];
                    if (!row) {
                        return Promise.reject({
                            code: 404,
                            description: 'Specified expense category doesn\'t exist'
                        });
                    }
                    return {
                        id: row.id,
                        category: row.category,
                        picture: row.picture,
                        balance: row.balance
                    }
                });
        })
        .catch(err => {
            if (typeof err.code == 'number') {
                return Promise.reject(err);
            } else {
                return Promise.reject({
                    code: 500,
                    description: `Error getting expense category by id from the database. ${err.message}`
                });
            }
        });
}

const updateExpenseById = (id, expense) => {
    return getConnection()
        .then(connection => {
            return connection.query('SELECT COUNT(*) as Count FROM expenses WHERE id=?', [id]).then(expenseResult => {
                if (expenseResult[0][0].Count == 0) {
                    return Promise.reject({
                        code: 404,
                        description: 'Specified expense category doesn\'t exist'
                    });
                } else {
                    return connection.query("UPDATE expenses SET category=?, picture=?, balance=? WHERE id=?", [expense.category, expense.picture, expense.balance, expense.id])
                        .then(result => {
                            connection.close();
                            return true;
                        });
                }
            })
        })
        .catch(err => {
            if (typeof err.code == 'number') {
                return Promise.reject(err);
            } else {
                return Promise.reject({
                    code: 500,
                    description: `Error getting expense category by id from the database. ${err.message}`
                });
            }
        });
}

module.exports = {
    getExpensesByUserId,
    getExpenseById,
    updateExpenseById
}