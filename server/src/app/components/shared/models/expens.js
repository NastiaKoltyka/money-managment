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
            return connection.query("SELECT category, picture, balance FROM savings WHERE user_id=?", userId)
                .then(result => {
                    connection.close();
                    return result[0].map(row => {
                        return {
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
                description: `Error getting user by id from the database. ${err.message}`
            });
        });
}

module.exports = {
    getExpensesByUserId
}