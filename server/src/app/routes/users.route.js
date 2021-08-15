const express = require('express');
const route = express.Router();
const passport = require('passport');


const usersController = require('../components/users/user.controller');

module.exports = () => {
    route.get('/:id', passport.authenticate('jwt', { session: false }), usersController.getUser); 
    return route;
}