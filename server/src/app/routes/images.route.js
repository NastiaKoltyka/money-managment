const express = require('express');
const route = express.Router();
var path = require('path');


module.exports = () => {
    route.get('/:name', function(req, res){
        let filePath = path.join(__dirname, '../../images', req.params.name);
        res.sendFile(filePath);
    }); 
    return route;
}