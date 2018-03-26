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
router.get('/transaction/:userName', function(request, response){
    const userName = request.params.userName;
    const sqlText = `SELECT DISTINCT R.* FROM accounts AS A
                    JOIN users AS U
                    ON A.user_id = U.id 
                    JOIN register AS R
                    ON R.account_id = A.account_id
                    WHERE U.username=$1`
    pool.query(sqlText,[userName])
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
 router.post('/transaction', (request, response)=>{
     const account_id = request.body.account_id;
     const date = request.body.date;
     const category = request.body.category;
     const amount = request.body.amount;
     const transaction_title = request.body.transaction_title;
     const description = request.body.description;

     const saveTransaction = {
         account_id: request.body.account_id,
         date: request.body.date,
         category: request.body.category,
         amount: request.body.amount,
         transaction_title: request.body.transaction_title,
         description: request.body.description
     };
     console.log('transaction title:', saveTransaction);
     pool.query(`INSERT INTO register (account_id, date, category, amount, transaction_title, description) VALUES ($1, $2, $3, $4, $5, $6) returning account_id`,
    [saveTransaction.account_id, saveTransaction.date, saveTransaction.category, saveTransaction.amount, saveTransaction.transaction_title, saveTransaction.description], (error, result)=>{
        if(error){
            console.log('Error in saveTransaction', error);
            response.sendStatus(500);
        }else{
            response.sendStatus(201);
        }
        });
 });


//  router.post('/register', (req, res, next) => {
//     const username = req.body.username;
//     const password = encryptLib.encryptPassword(req.body.password);
  
//     var saveUser = {
//       username: req.body.username,
//       password: encryptLib.encryptPassword(req.body.password)
//     };
//     console.log('new user:', saveUser);
//     //holding place if phone and email are used in the future
//     // pool.query('INSERT INTO users (username, password, phone_number, email) VALUES ($1, $2, $3, $4) RETURNING id',
//     pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
//     //holding place if phone and email are used in the future
//     // [saveUser.username, saveUser.password, saveUser.phone_number, saveUser.email], (err, result) => {
//       [saveUser.username, saveUser.password], (err, result) => {
//         if (err) {
//           console.log("Error inserting data: ", err);
//           res.sendStatus(500);
//         } else {
//           res.sendStatus(201);
//         }
//       });
//   });
 

module.exports=router;
