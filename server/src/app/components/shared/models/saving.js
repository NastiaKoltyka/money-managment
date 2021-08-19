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
    const savingTable = `
    create table if not exists savings(
        id int primary key auto_increment,
        category varchar(250) not null,
        picture varchar(250) not null,
        balance int,
        user_id int not null,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE);`
    const insertSavingTable = `INSERT INTO savings (user_id, category, picture, balance) VALUES ?`
    return connection.query(savingTable)
        .then(result => {
            return connection.query('SELECT COUNT(*) as Count FROM users')
                .then(usersCountResult => {
                    if (usersCountResult[0][0].Count == 0) {
                        return connection.query(insertSavingTable, [
                            [
                                [1, 'cash', 'money.png', 8000],
                                [1, 'bank', 'bank.png', 1500],
                                [2, 'cash', 'money.png', 900],
                                [2, 'bank', 'bank.png', 0],
                                [3, 'cash', 'money.png', 13578],
                                [3, 'bank', 'bank.png', 12345]
                            ]
                        ]).then(insertResult => {
                            return connection;
                        })
                    } else {
                        return connection;
                    }
                })

        });
}
const getSavingsById = (userId) => {
return getConnection()
    .then(connection => {
        return connection.query("SELECT category, picture, balance FROM savings WHERE user_id=?", user.id)
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
        
});}
