// DEPENDENCIES
const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");
require("dotenv").config();

// MIDDLEWARE
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors());

//Routes
app.get('/', (req, res) => {
    res.send('Welcome to the recipe api!')
})

app.use("/users", require("./controllers/users"))

app.get('*', (req, res) => {
    res.status(404).send('Sorry, couldn\'t find that endpoint :(')
})

app.listen(process.env.PORT)
