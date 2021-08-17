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

    const createUsersTable = `
        create table if not exists users(
            id int primary key auto_increment,
            name varchar(255) not null,
            surname varchar(255) not null,
            email varchar(255) not null,
            password varchar(255) not null);`;

    const expenseTable = `
        create table if not exists expenses(
            id int primary key auto_increment,
            category varchar(250) not null,
            picture varchar(250) not null,
            user_id int not null,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE);`

    const savingTable = `
        create table if not exists savings(
            id int primary key auto_increment,
            category varchar(250) not null,
            picture varchar(250) not null,
            user_id int not null,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE);`


    const insertUser = `INSERT INTO users (name,surname, email, password )  VALUES ?`;

    const insertExpenseTable = `INSERT INTO expenses (user_id, category, picture) VALUES ?`
    const insertSavingTable = `INSERT INTO savings (user_id, category, picture) VALUES ?`
    return Promise.all([connection.query(createUsersTable), connection.query(expenseTable), connection.query(savingTable)])
        .then(result => {
            return connection.query('SELECT COUNT(*) as Count FROM users')
                .then(usersCountResult => {
                    if (usersCountResult[0][0].Count == 0) {
                        return connection.query(insertUser, [[
                                ['admin','admin','admin@gmail.com', 'admin'],
                                ['Petro','Petrov','petro@gmail.com', '12345'],
                                ['Ira', 'Ivanova','ira@gmail.com', '1111']]
                            ])
                            .then(createExpenseResult => {
                                console.log('success')
                                return Promise.all([connection.query(insertExpenseTable, [
                                    [
                                        [1, 'food', 'fork.png'],
                                        [1, 'movies', 'cinema.png'],
                                        [2, 'food', 'fork.png'],
                                        [3, 'food', 'fork.png'],
                                        [3, 'medical', 'first-aid-kit.png']
                                    ]
                                ]), connection.query(insertSavingTable, [
                                    [
                                        [1, 'cash', 'money.png'],
                                        [1, 'bank', 'bank.png'],
                                        [2, 'cash', 'money.png'],
                                        [2, 'bank', 'bank.png'],
                                        [3, 'cash', 'money.png'],
                                        [3, 'bank', 'bank.png']
                                    ]
                                ])]).then(insertResult => {
                                    return connection;
                                })
                            });
                            
                    } else {
                        return connection;
                    }
                })
        });
}

const getUserById = (userId) => {
    return getConnection()
        .then(connection => {
            const selectSql = 'SELECT * FROM users WHERE id=?'
            return connection.query(selectSql, [userId])
                .then(selectedResult => {
                    let user = selectedResult[0][0];
                    if (!user) {
                        return Promise.reject({
                            code: 404,
                            description: 'Specified user doesn\'t exist'
                        });
                    }
                    return user;
                }).then(user => {
                    return connection.query("SELECT category, picture FROM expenses WHERE user_id=?", user.id)
                        .then(result => {
                            console.log('Result: ', result[0][0].category);
                            user.expenses = result[0].map(row => {
                                return { category: row.category, picture: row.picture}
                            });
                            console.log(user.expenses);
                            return user;
                        });

                })
                .then(user => {
                    return connection.query("SELECT category, picture FROM savings WHERE user_id=?", user.id)
                        .then(result => {
                            user.savings = result[0].map(row => {
                                return { category: row.category, picture: row.picture}
                            });
                            return user;
                        });

                })
                .then(user=> {
                    connection.close();
                    return filterUserFields(user);
                })
        }).catch(err => {
            if (typeof err.code == 'number') {
                return Promise.reject(err);
            } else {
                return Promise.reject({
                    code: 500,
                    description: `Error getting user by id from the database. ${err.message}`
                });
            }
        });
}

const filterUserFields = (user) => {
    const {
        id,
        name,
        surname,
        email,
        password,
        expenses,
        savings,
    } = user;
    let plainUser = {
        id,
        name,
        surname,
        email,
        password,
        expenses,
        savings
    };
    return plainUser
}


const getUserByCredentials = (email, password) => {
    return getConnection()
        .then(connection => {
            const selectSql = 'SELECT * FROM users WHERE email=? AND password=?'
            return connection.query(selectSql, [email, password])
                .then(selectedResult => {
                    let user = selectedResult[0][0];
                    if (!user) {
                        return Promise.reject({
                            code: 404,
                            description: 'Specified user doesn\'t exist'
                        });
                    }
                    return user;
                }).then(user => {
                    return connection.query("SELECT category, picture FROM expenses WHERE user_id=?", user.id)
                        .then(result => {
                            user.expenses = result[0].map(row => {
                                return { category: row.category, picture: row.picture}
                            });
                            return user;
                        });

                })
                .then(user => {
                    return connection.query("SELECT category, picture FROM savings WHERE user_id=?", user.id)
                        .then(result => {
                            user.savings = result[0].map(row => {
                                return { category: row.category, picture: row.picture}
                            });
                            return user;
                        });

                })
                .then(user=> {
                    connection.close();
                    return filterUserFields(user);
                })
        }).catch(err => {
            if (typeof err.code == 'number') {
                return Promise.reject(err);
            } else {
                return Promise.reject({
                    code: 500,
                    description: `Error getting user by credentials from the database. ${err.message}`
                });
            }
        });
}

module.exports = {
    getUserById,
    getUserByCredentials
  }
  