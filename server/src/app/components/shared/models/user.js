const mysql = require('mysql2');
const config = require('../../../../config/app');
const expenses = require('./expense');
const savings = require('./saving');

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
            currency varchar(255) not null,
            income float not null,
            picture varchar(500),
            balance int,
            password varchar(255) not null);`;

    const expenseTable = `
        create table if not exists expenses(
            id int primary key auto_increment,
            category varchar(250) not null,
            picture varchar(250) not null,
            balance int,
            user_id int not null,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE);`

    const savingTable = `
        create table if not exists savings(
            id int primary key auto_increment,
            category varchar(250) not null,
            picture varchar(250) not null,
            balance int,
            user_id int not null,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE);`

    const historyTable= `
    create table if not exists history(
        id int primary key auto_increment,
        date datetime,
        user_id int,
        expense_id int,
        saving_id int,
        amount int,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE);`

    const insertUser = `INSERT INTO users (name,surname, email, password, currency, income, balance, picture)  VALUES ?`;

    const insertExpenseTable = `INSERT INTO expenses (user_id, category, picture, balance) VALUES ?`
    const insertSavingTable = `INSERT INTO savings (user_id, category, picture, balance) VALUES ?`

    return Promise.all([connection.query(createUsersTable), connection.query(expenseTable), connection.query(savingTable),connection.query(historyTable) ])
        .then(result => {
            return connection.query('SELECT COUNT(*) as Count FROM users')
                .then(usersCountResult => {
                    if (usersCountResult[0][0].Count == 0) {
                        return connection.query(insertUser, [
                                [
                                    ['admin', 'admin', 'admin@gmail.com', 'admin', 'UAH', 20000, 29500,'2754576_woman_female_avatar_icon.svg'],
                                    ['Petro', 'Petrov', 'petro@gmail.com', '12345', 'UAH', 1200, 2100,'2754582_business_man_man_avatar_icon.svg'],
                                    ['Ira', 'Ivanova', 'ira@gmail.com', '1111', 'UAH', 6000, 31923,'2754580_woman_business_woman_avatar_female_icon.svg']
                                ]
                            ])
                            .then(createExpenseResult => {
                                return Promise.all([connection.query(insertExpenseTable, [
                                    [
                                        [1, 'food', 'fork.png', 200],
                                        [1, 'movies', 'cinema.png', 100],
                                        [2, 'food', 'fork.png', 300],
                                        [3, 'food', 'fork.png', 50],
                                        [3, 'medical', 'first-aid-kit.png', 150]
                                    ]
                                ]), connection.query(insertSavingTable, [
                                    [
                                        [1, 'cash', 'money.png', 8000],
                                        [1, 'bank', 'bank.png', 1500],
                                        [2, 'cash', 'money.png', 900],
                                        [2, 'bank', 'bank.png', 0],
                                        [3, 'cash', 'money.png', 13578],
                                        [3, 'bank', 'bank.png', 12345]
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
                    return expenses.getExpensesByUserId(user.id).then(exp => {
                        user.expenses = exp;
                        user.totalExpense = 0
                        user.expenses.forEach(expense => {
                            user.totalExpense += expense.balance;
                        });
                        return user;
                    });
                })
                .then(user => {
                    return savings.getSavingsByUserId(user.id).then(savings => {
                        user.savings = savings;
                        return user;
                    });
                })
                .then(user => {
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
        currency,
        income,
        balance,
        totalExpense,
        expenses,
        savings,
        picture,
    } = user;
    let plainUser = {
        id,
        name,
        surname,
        email,
        password,
        currency,
        income,
        balance,
        totalExpense,
        expenses,
        savings,
        picture,
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
                    return expenses.getExpensesByUserId(user.id).then(exp => {
                        user.expenses = exp;
                        user.totalExpense = 0
                        user.expenses.forEach(expense => {
                            user.totalExpense += expense.balance;
                        });
                        return user;
                    });
                })
                .then(user => {
                    return savings.getSavingsByUserId(user.id).then(savings => {
                        user.savings = savings;
                        return user;
                    });
                })
                .then(user => {
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

const updateUserById = (userId, user) => {
    return getConnection()
        .then(connection => {
            return connection.query('SELECT COUNT(*) as Count FROM users WHERE id=?', [userId]).then(checkUserResult => {
                if (checkUserResult[0][0].Count == 0) {
                    return Promise.reject({
                        code: 404,
                        description: 'Specified user doesn\'t exist'
                    });

                } else {
                    const sql = `UPDATE users SET name=?, surname=?, email=?, password=?, currency=?, income=?, balance=?, picture=? WHERE id=?`;
                    const data = [user.name, user.surname, user.email, user.password, user.currency, user.income, user.balance, user.picture, userId];
                    return connection.query(sql, data)
                        .then(userResult => {
                            connection.close();
                            return true;
                        })
                }
            });
        }).catch(err => {
            if (typeof err.code == 'number') {
                return Promise.reject(err);
            } else {
                return Promise.reject({
                    code: 500,
                    description: `Error updating user in the database. ${err.message}`
                });
            }
        });
}

module.exports = {
    getUserById,
    getUserByCredentials,
    updateUserById,
}