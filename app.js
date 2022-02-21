require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

//DB connection
//Stays open for other mongoose scripts to access during runtime
connection(); //Async due to connection taking time

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/users", userRoutes)
app.listen("/api/auth", authRoutes)

const Port = process.env.PORT || 4000;
app.listen(Port, () => console.log(`Port ${Port} has risen...`));
