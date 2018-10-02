// all user related routes
const express = require('express');
const mysql = require('mysql');
const router = express.Router();

router.get('/messages', (request, response) => {
    console.log("Yeet")
    response.end()
})

router.get('/users', (request, response) => {
    const connection = getConnection();
    const queryString = "SELECT * FROM users"
    connection.query(queryString, (err, rows, fields) => {
        if(err){
            console.log("Failed to query: " + err);
            response.sendStatus(500);
            return;
        }
        console.log("Fetched all users successfully");
        response.json(rows);
    })
})

//create a new user
router.post('/user_create', (request, response) => {
    //name of input in html file
    const firstName = request.body.create_first_name;
    const lastName = request.body.create_last_name;
    const queryString = "INSERT INTO users (first_name, last_name) VALUES (?, ?)"
    getConnection().query(queryString, [firstName, lastName], (err, results, fields) => {
        if (err){
            console.log("Failed to insert new user: " + err);
            response.sendStatus(500);
            return;
        }
        console.log("Inserted new user")
        response.end()
    })
})

//get user based on ids
//get the url parameter using params.id
router.get('/user/:id', (request, response) => {
    console.log('Fetching user id: ' + request.params.id);
    const connection = getConnection();
    const userId = request.params.id;
    const queryString = "SELECT * FROM users WHERE id = ?";
    connection.query(queryString, [userId], (err, rows, fields) => {
        if(err){
            console.log("Failed to query: " + err);
            response.sendStatus(500);
            // response.end();
            return;
        }
        console.log("Fetched successfully");
        //change format or json
        const users = rows.map((row) => {
            return {firstname: row.first_name, lastName: row.last_name}
        })
        response.json(rows);
    })
    // response.end();
})

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root2',
    database: 'lbta_mysql',
    port: '8889'

})

//set up connection to our database
function getConnection(){
    return pool
}

module.exports = router