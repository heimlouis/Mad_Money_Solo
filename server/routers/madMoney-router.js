const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const encryptLib = require('../modules/encryption');
const Person = require('../models/Person');
const userStrategy = require('../strategies/sql.localstrategy');


//get transaction
router.get('/transaction', function(request, response){
    const sqlText = 'SELECT * FROM register ORDER BY date DESC';
    pool.query(sqlText)
    .then(function(result){
        response.send(result.rows);
    })
    .catch(function(error){
        console.log('Error on GET:', error);
        response.sendStatus(500);
    })
 })//end get transaction

 //get account
 router.get('/account/:userName', function(request, response){
    const userName = request.params.userName;
    // console.log('******* this is the usernme to get accounts *******', userName);
    const sqlText = `SELECT distinct A.account_name, (select SUM(amount) - budget_amount from accounts) as budget_amount FROM accounts AS A
                    JOIN USERS AS U
                    ON A.user_id = U.id 
                    JOIN REGISTER AS R
                    ON R.account_id = A.account_id
                    WHERE U.username=$1
                    group by account_name`
    pool.query(sqlText,[userName])
    .then(function(result){
        response.send(result.rows);
    })
    .catch(function(error){
        console.log('Error on GET:', error);
        response.sendStatus(500);
    })
 })//end get account

 //post transaction
 router.post('/transaction', function(request, response){
 })

module.exports=router;
