const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const encryptLib = require('../modules/encryption');
const Person = require('../models/Person');
const userStrategy = require('../strategies/sql.localstrategy');

// Handles Ajax request for user information if user is authenticated
router.get('/', (req, res) => {
    // check if logged in
    if (req.isAuthenticated()) {
      // send back user object from database
      res.send(req.user);
    } else {
      // failure best handled on the server. do redirect here.
      res.sendStatus(403);
    }
  });

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
    const sqlText = `SELECT DISTINCT A.account_name, (SELECT DISTINCT budget_amount FROM accounts) - (SELECT SUM(amount) FROM register) AS remaining_balance FROM accounts AS A
                    JOIN users AS U
                    ON A.user_id = U.id 
                    JOIN register AS R
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
