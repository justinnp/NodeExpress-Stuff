//MySQL stuff
// SELECT * FROM users WHERE first_name = "Uncle"
// INSERT INTO users (first_name, last_name) VALUES("Uncle", "Jack")
// DELETE FROM users WHERE id = 8
// UPDATE users SET first_name = "Mac" WHERE id = 1

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(cors())
app.use(morgan('short'));
app.use(express.static('./public'))
//middleware
app.use(bodyParser.urlencoded({extended: false}))

//set up connection to our database
function getConnection(){
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root2',
        database: 'lbta_mysql',
        port: '8889'
    })
}

//create a new user
app.post('/user_create', (request, response) => {
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
app.get('/users/:id', (request, response) => {
    console.log('Fetching user id: ' + request.params.id);
    const connection = getConnection();
    //for database
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

app.listen(3000, () => {
    console.log('Server is up and listening on 3000');
})

app.get("/", (request, response) => {
    console.log("Responding to root route");
    response.send("Nodejs REST Home");
})

app.get("/user", (request, response) => {
    var user1 = {firstname: "Justin", lastname: "Powell"}
    var user2 = {firstname: "Navon", lastname: "Francis"}
    response.json([user1, user2]);
    //response.send("Users");
})