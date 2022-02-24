// DEPENDENCIES
const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");
require("dotenv").config();


// const connection = require("./db"); Might not be needed here
//DB connection
//Stays open for other mongoose scripts to access during runtime
// connection(); //Async due to connection taking time

// MIDDLEWARE
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors());

//Routes
app.get('/', (req, res) => {
    res.send('Welcome to the recipe api!')
})

app.use("/users", require("./routes/users"))

app.use("/api/auth", require("./routes/auth"))

app.get('*', (req, res) => {
    res.status(404).send('Sorry, couldn\'t find that endpoint :(')
})

const Port = process.env.PORT || 4000;
app.listen(Port, () => console.log(`Port ${Port} has risen...`));
