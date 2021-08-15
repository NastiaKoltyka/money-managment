const express = require('express');
const mySql = require('mysql2');
const cors = require('cors');
const passport  = require('passport');
require('./src/app/components/shared/models');
const bodyParser = require('body-parser');
const routing = require('./src/app/routes');
const config = require('./src/config/app');
require('./src/app/auth/passport');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/', routing());

const appPort = config.appPort;

const connection = mySql.createConnection({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password
});

connection.connect(function (err) {
    if (err) {
        console.log(`Error connecting to ${config.host}`, err)
    } else {
        connection.query("CREATE DATABASE if not exists moneyManagement", function (err, result) {
            if (err) {
                console.log(`Error creating database moneyManagement`, err)
            } else {
                console.log("Database created");
                app.listen(appPort, () => console.log(`Listen on port: ${appPort}`));
            }
        });
    }
});