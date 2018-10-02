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

//router
const router = require('./routes/user.js');
app.use(router)

app.use(cors());
//shows http requests and status in terminal
app.use(morgan('short'));
//for the form
app.use(express.static('./public'));
//middleware
app.use(bodyParser.urlencoded({extended: false}))

app.listen(3000, () => {
    console.log('Server is up and listening on 3000');
})

app.get("/", (request, response) => {
    console.log("Responding to root route");
    response.send("Nodejs REST Home");
})
