const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//Add the POST, GET, DELETE, and PUT routes
router.get('/', function(request, response){
    const sqlText = 'SELECT * FROM register ORDER BY date DESC';
    pool.query(sqlText)
    .then(function(result){
        response.send(result.rows);
    })
    .catch(function(error){
        console.log('Error on GET:', error);
        response.sendStatus(500);
    })
 })

module.exports=router;
