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
router.get('/transaction/:userName', function (request, response) {
    const userName = request.params.userName;
    const sqlText = `SELECT DISTINCT R.* FROM accounts AS A
                    JOIN users AS U
                    ON A.user_id = U.id 
                    JOIN register AS R
                    ON R.account_id = A.account_id
                    WHERE U.username=$1
                    ORDER BY date DESC`
    pool.query(sqlText, [userName])
        .then(function (result) {
            response.send(result.rows);
        })
        .catch(function (error) {
            console.log('Error on GET:', error);
            response.sendStatus(500);
        })
})//end get transaction

//get account
router.get('/account/:userName', function (request, response) {
    const userName = request.params.userName;
    // console.log('******* this is the usernme to get accounts *******', userName);
    const sqlText = `SELECT DISTINCT A.account_name, A.budget_amount, A.account_id, (SELECT DISTINCT budget_amount FROM accounts) - (SELECT SUM(amount) FROM register) AS remaining_balance FROM accounts AS A
                    JOIN users AS U
                    ON A.user_id = U.id 
                    JOIN register AS R
                    ON R.account_id = A.account_id
                    WHERE U.username=$1
                    group by A.account_name, A.budget_amount, A.account_id`
    pool.query(sqlText, [userName])
        .then(function (result) {
            response.send(result.rows);
        })
        .catch(function (error) {
            console.log('Error on GET:', error);
            response.sendStatus(500);
        })
})//end get account

//post transaction
router.post('/transaction/:account_id', function (request, response) {
    const account_id = request.params.account_id;
    console.log('in request.params:', request.params.account_id);
    const sqlText = `INSERT INTO register (account_id, date, category, amount, transaction_title, description) VALUES ($1, $2, $3, $4, $5, $6)`
    pool.query(sqlText, [account_id, request.body.date, request.body.category, request.body.amount, request.body.transaction_title, request.body.description])
        .then(function (result) {
            console.log('added transaction', result);
            response.sendStatus(201);
        })
        .catch(function (error) {
            console.log('error in add transaction', error);
            response.sendStatus(500);
        })
});

//delete transaction
router.delete('/transaction/:deleteRegId', function (request, response) {
    console.log('delete request', request.params.deleteRegId);
    // response.send(200)
    const sqlText = `DELETE FROM register
                    WHERE register_id=$1::integer;`
    pool.query(sqlText, [request.params.deleteRegId])
        .then(function (result) {
            response.send(result.rows);
        })
        .catch(function (error) {
            console.log('Error on delete:', error);
            response.sendStatus(500);
        })
})//end delete transaction

module.exports = router;