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
    const sqlText = `SELECT DISTINCT R.*, A.account_name FROM accounts AS A
                    JOIN users AS U
                    ON A.user_id = U.id 
                    JOIN register AS R
                    ON R.account_id = A.account_id
                    WHERE U.username=$1
                    ORDER BY A.account_name, R.date DESC`
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
    const sqlText = `SELECT DISTINCT A.account_name, A.budget_amount, A.account_id, (A.budget_amount) - (SELECT SUM(amount) FROM register AS R WHERE R.account_id = A.account_id) AS remaining_balance FROM accounts AS A
                    JOIN users AS U
                    ON A.user_id = U.id 
                    WHERE U.username=$1
                    group by A.account_name, A.budget_amount, A.account_id`
    pool.query(sqlText, [userName])
        .then(function (result) {
            for (let row of result.rows) {
                if (row.remaining_balance == null) {
                    row.remaining_balance = row.budget_amount
                }
                console.log('this is the row', row);
            }
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
    console.log(request.body, 'request.body in router');

    const sqlText = `INSERT INTO register (account_id, date, category, amount, transaction_title, description, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7)`
    pool.query(sqlText, [account_id, request.body.date, request.body.category, request.body.amount, request.body.transaction_title, request.body.description, request.body.imageUrl])
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
            response.sendStatus(201);
        })
        .catch(function (error) {
            console.log('Error on delete:', error);
            response.sendStatus(500);
        })
})//end delete transaction

//post account
router.post('/account', function (request, response) {
    // console.log('in request.params:', request.body.user_name);
    // console.log(request.body, 'account post request.body in router******************');
    const sqlText = `INSERT INTO accounts (user_id, account_name, budget_amount) VALUES ((select distinct u.id from users as u left join accounts as a on u.id=a.user_id where u.username=$1), $2, $3)`
    pool.query(sqlText, [request.body.user_name, request.body.account_name, request.body.budget_amount])
        .then(function (result) {
            console.log('added transaction', result);
            response.sendStatus(201);
        })
        .catch(function (error) {
            console.log('error in add transaction', error);
            response.sendStatus(500);
        })
});//end post account

module.exports = router;