const mysql = require('mysql2');
const config = require('../../../../config/app');

const getConnection = () => {
    const connection = mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.user,
        database: 'moneyManagement',
        password: config.password
    }).promise();

    return Promise.resolve(connection);
}
const getHistoryByUserId = (userId, month, year) => {
    return getConnection()
        .then(connection => {
            return connection.query("SELECT date, user_id, expense_id, saving_id, amount FROM history WHERE user_id=? AND YEAR (date)=? AND MONTH (date)=?", [userId, year, month])
                .then(result => {
                    console.log(result)
                    connection.close();
                    return result[0].map(row => {
                        return {
                            date: row.date,
                            expenseId: row.expense_id,
                            savingId: row.saving_id,
                            amount: row.amount,
                        }
                    });
                    
                });
        })
        .catch(err => {
            return Promise.reject({
                code: 500,
                description: `Error getting transactions history for user from the database. ${err.message}`
            });
        });
}

const insertHistory = (userId, expenseId, savingId, amount, date) => {
    return getConnection()
        .then(connection => {
            return connection.query("INSERT INTO  history (date, user_id, expense_id, saving_id, amount) VALUES (?)", [[date, userId, expenseId, savingId, amount]])
                .then(result => {
                    connection.close();
                    return true;
                });
        })
        .catch(err => {
            return Promise.reject({
                code: 500,
                description: `Error inserting history row to the database. ${err.message}`
            });
        });
}


module.exports = {
    getHistoryByUserId,
    insertHistory
}